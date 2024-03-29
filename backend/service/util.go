package service

import (
	"backend/data"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strconv"
	"time"

	"github.com/nleeper/goment"
)

func GetNetworkInfo() (int, data.NetworkInfo) {
	maxRetries := 3
	retryInterval := time.Millisecond * 250
	var returnNetworkInfo data.NetworkInfo

	for retries := 0; retries < maxRetries; retries++ {
		resp, err := http.Get("https://xmrchain.net/api/networkinfo")
		if err != nil {
			return resp.StatusCode, returnNetworkInfo
		}
		defer resp.Body.Close()

		body, err := io.ReadAll(resp.Body)
		if err != nil {
			return resp.StatusCode, returnNetworkInfo
		}

		var networkInfo data.NetworkInfo
		if err := json.Unmarshal(body, &networkInfo); err != nil {
			return resp.StatusCode, returnNetworkInfo
		}

		if resp.StatusCode == 200 && networkInfo.Data.Height > 1 {
			return resp.StatusCode, networkInfo
		}

		if retries < maxRetries-1 {
			time.Sleep(retryInterval)
		}
	}

	return http.StatusServiceUnavailable, returnNetworkInfo
}

func GetPrice() (int, data.Price) {
	var returnPrice data.Price

	resp, err := http.Get("https://www.okx.com/api/v5/market/ticker?instId=XMR-USD-SWAP")

	if err != nil {
		return resp.StatusCode, returnPrice
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return resp.StatusCode, returnPrice
	}

	var price data.Price
	if err := json.Unmarshal(body, &price); err != nil {
		return resp.StatusCode, returnPrice
	} else {
		return resp.StatusCode, price
	}
}

func GetBlockByNumber(number int) (int, data.BlockInfo) {
	var returnBlock data.BlockInfo
	returnBlock.Status = "fail"

	url := fmt.Sprintf("https://xmrchain.net/api/block/%s", strconv.Itoa(number))
	resp, err := http.Get(url)
	if err != nil {
		return resp.StatusCode, returnBlock
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return resp.StatusCode, returnBlock
	}

	var block data.BlockInfo
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

func GetMempool() (int, data.Mempool) {
	var returnMempool data.Mempool
	returnMempool.Status = "fail"

	resp, err := http.Get("https://xmrchain.net/api/mempool")
	if err != nil {
		return resp.StatusCode, returnMempool
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return resp.StatusCode, returnMempool
	}

	var mempool data.Mempool
	if err := json.Unmarshal(body, &mempool); err != nil {
		return resp.StatusCode, returnMempool
	} else if mempool.Status == "fail" {
		return resp.StatusCode, returnMempool
	} else {
		return resp.StatusCode, mempool
	}
}
