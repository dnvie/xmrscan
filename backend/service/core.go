package service

import (
	"backend/data"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"sort"
	"strconv"
	"sync"
	"time"

	"github.com/go-chi/chi"
	"github.com/nleeper/goment"
)

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
		block.Data.RelativeTime = relativeTime
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
	height := -1
	resp, info := GetNetworkInfo()
	if resp == 200 {
		height = (info.Data.Height - 1) - page*25
	}

	wg := new(sync.WaitGroup)
	for i := height; i > height-25; i-- {
		wg.Add(1)

		go func(returnBlock data.Blocks, i int, wg *sync.WaitGroup) {
			defer wg.Done()
			_, currBlock := GetBlockByNumber(i)
			returnBlocks.Blocks = append(returnBlocks.Blocks, currBlock)
		}(returnBlocks, i, wg)
	}
	wg.Wait()

	sort.Slice(returnBlocks.Blocks, func(i, j int) bool {
		return returnBlocks.Blocks[i].Data.BlockHeight > returnBlocks.Blocks[j].Data.BlockHeight
	})

	return 200, returnBlocks
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
