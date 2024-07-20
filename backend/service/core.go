package service

import (
	"backend/data"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strconv"
	"time"

	"github.com/go-chi/chi"
	"github.com/nleeper/goment"
)

func GetHome(r *http.Request) (int, data.Home) {
	var returnHome data.Home
	returnHome.Status = "fail"

	resp, blocks := GetBlocks(r)
	if resp != 200 {
		return resp, returnHome
	}
	returnHome.Blocks = blocks.Blocks[:10]

	resp2, err := http.Get("https://xmrchain.net/api/mempool")
	if err != nil {
		return resp2.StatusCode, returnHome
	}
	defer resp2.Body.Close()

	body, err := io.ReadAll(resp2.Body)
	if err != nil {
		return resp2.StatusCode, returnHome
	}

	var mempool data.Mempool
	if err := json.Unmarshal(body, &mempool); err != nil {
		return resp2.StatusCode, returnHome
	} else if mempool.Status == "fail" {
		return resp2.StatusCode, returnHome
	} else {
		returnHome.Txs = mempool.Data.Txs
		if len(returnHome.Txs) > 10 {
			returnHome.Txs = returnHome.Txs[:10]
		}
		returnHome.Status = "success"
		return 200, returnHome
	}
}

func GetBlock(r *http.Request) (int, data.Block) {
	var returnBlock data.Block
	returnBlock.Status = "fail"

	height := chi.URLParam(r, "height")
	url := fmt.Sprintf("https://xmrchain.net/api/block/%s", height)

	resp, err := http.Get(url)
	if err != nil {
		return resp.StatusCode, returnBlock
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return resp.StatusCode, returnBlock
	}

	var block data.Block
	if err := json.Unmarshal(body, &block); err != nil {
		return resp.StatusCode, returnBlock
	} else if block.Status == "fail" {
		return resp.StatusCode, returnBlock
	} else {
		g, _ := goment.New(time.UnixMilli(block.Data.Timestamp * 1000))
		relativeTime := g.FromNow()
		if relativeTime == "a few seconds ago" {
			relativeTime = "seconds ago"
		}
		if relativeTime == "in a few seconds" {
			relativeTime = "seconds ago"
		}
		block.Data.RelativeTime = relativeTime
		returnBlock.Status = "success"
		return resp.StatusCode, block
	}
}

func GetTx(r *http.Request) (int, data.Tx) {
	var returnTx data.Tx
	returnTx.Status = "fail"

	url := fmt.Sprintf("https://xmrchain.net/api/transaction/%s", chi.URLParam(r, "hash"))
	resp, err := http.Get(url)
	if err != nil {
		return resp.StatusCode, returnTx
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return resp.StatusCode, returnTx
	}

	var tx data.Tx
	if err := json.Unmarshal(body, &tx); err != nil {
		return resp.StatusCode, returnTx
	} else if tx.Status == "fail" {
		return resp.StatusCode, returnTx
	} else {
		returnTx.Status = "success"
		return resp.StatusCode, tx
	}
}

func GetBlocks(r *http.Request) (int, data.Blocks) {
	var page int
	page, err := strconv.Atoi(chi.URLParam(r, "page"))
	if err != nil {
		page = 0
	}
	var returnBlocks data.Blocks

	url := fmt.Sprintf("https://xmrchain.net/api/transactions?page=%d", page)
	resp, err := http.Get(url)
	if err != nil {
		return resp.StatusCode, returnBlocks
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return resp.StatusCode, returnBlocks
	}

	var tBlocks data.TransactionsBlocks
	if err := json.Unmarshal(body, &tBlocks); err != nil {
		return resp.StatusCode, returnBlocks
	} else if tBlocks.Status == "fail" {
		return resp.StatusCode, returnBlocks
	} else {
		var blocks data.Blocks
		for _, block := range tBlocks.Data.Blocks {
			var blockInfo data.BlockInfo
			blockInfo.Data.BlockHeight = block.Height
			blockInfo.Data.Hash = block.Hash
			blockInfo.Data.Timestamp = block.Timestamp
			blockInfo.Data.Txs = block.Txs
			g, _ := goment.New(time.UnixMilli(block.Timestamp * 1000))
			relativeTime := g.FromNow()
			if relativeTime == "a few seconds ago" {
				relativeTime = "seconds ago"
			}
			blockInfo.Data.RelativeTime = relativeTime
			blocks.Blocks = append(blocks.Blocks, blockInfo)
		}
		blocks.CurrentHeight = tBlocks.Data.CurrentHeight
		blocks.Limit = tBlocks.Data.Limit
		blocks.Page = tBlocks.Data.Page
		blocks.TotalPageNo = tBlocks.Data.TotalPageNo
		return resp.StatusCode, blocks
	}
}

func GetSearchResult(r *http.Request) (int, data.SearchResult) {
	var returnSearchResult data.SearchResult

	url := fmt.Sprintf("https://xmrchain.net/api/search/%s", chi.URLParam(r, "query"))
	resp, err := http.Get(url)
	if err != nil {
		return resp.StatusCode, returnSearchResult
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return resp.StatusCode, returnSearchResult
	}

	var result data.BlockSearch
	var searchResult data.SearchResult
	if err := json.Unmarshal(body, &result); err != nil {
		return 400, returnSearchResult
	} else {
		if result.Data.Hash == "" {
			var result data.TxSearch
			if err := json.Unmarshal(body, &result); err != nil {
				return 400, returnSearchResult
			} else {
				if result.Data.TxHash == "" {
					return 400, returnSearchResult
				} else {
					searchResult.Tx = result
					searchResult.Type = 1
					return resp.StatusCode, searchResult
				}
			}
		} else {
			searchResult.Block = result
			searchResult.Type = 0
			return resp.StatusCode, searchResult
		}
	}
}
