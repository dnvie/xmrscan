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

func GetNetworkInfo() (int, data.NetworkInfo) {
	maxRetries := 3
	retryInterval := time.Millisecond * 100
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
		returnBlock.Status = "success"
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
		returnMempool.Status = "success"
		return resp.StatusCode, mempool
	}
}

func GetProve(r *http.Request, mode string) (int, data.Prove) {
	var returnProve data.Prove
	returnProve.Status = "fail"

	url := fmt.Sprintf("https://xmrchain.net/api/outputs?txhash=%s&address=%s&viewkey=%s&txprove=%s", chi.URLParam(r, "txhash"), chi.URLParam(r, "address"), chi.URLParam(r, "viewkey"), mode)
	resp, err := http.Get(url)

	if err != nil {
		return resp.StatusCode, returnProve
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return resp.StatusCode, returnProve
	}

	var prove data.Prove
	if err := json.Unmarshal(body, &prove); err != nil {
		return resp.StatusCode, returnProve
	} else if prove.Status == "error" {
		return resp.StatusCode, returnProve
	} else {
		returnProve.Status = "success"
		return resp.StatusCode, prove
	}
}

func GetProveResults(r *http.Request, mode string) (int, data.ProveResult) {
	status, prove := GetProve(r, mode)
	var proveResult data.ProveResult

	if status == 200 {
		for _, output := range prove.Data.Outputs {
			if output.Match == true {
				proveResult.Matches = append(proveResult.Matches, output.OutputPubkey)
			}
		}
		proveResult.Amount = len(proveResult.Matches)
		return 200, proveResult
	} else {
		return status, proveResult
	}
}
