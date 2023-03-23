package service

import (
	"backend/data"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strconv"
)

func GetNetworkInfo() data.NetworkInfo {
	var returnNetworkInfo data.NetworkInfo
	returnNetworkInfo.Status = "fail"

	resp, err := http.Get("https://xmrchain.net/api/networkinfo")
	if err != nil {
		fmt.Println("error getting network info")
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		fmt.Println("error reading network info")
	}

	var networkInfo data.NetworkInfo
	if err := json.Unmarshal(body, &networkInfo); err != nil {
		fmt.Println("cannot unmarshal JSON")
	}

	if networkInfo.Status == "success" {
		return networkInfo
	} else {
		return returnNetworkInfo
	}
}

func GetPrice(r *http.Request) (int, data.Price) {
	var returnPrice data.Price
	ctx := r.Context()

	fmt.Printf("%s: got /price request\n", ctx.Value(keyServerAddr))

	resp, err := http.Get("https://api.coingecko.com/api/v3/simple/price?ids=monero&vs_currencies=usd")
	if err != nil {
		return 404, returnPrice
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return 404, returnPrice
	}

	var price data.Price
	if err := json.Unmarshal(body, &price); err != nil {
		fmt.Println("cannot unmarshal JSON")
		return 404, returnPrice
	} else {
		return 200, price
	}
}

func GetBlockByNumber(number int) (int, data.BlockInfo) {
	var returnBlock data.BlockInfo
	returnBlock.Status = "fail"

	url := fmt.Sprintf("https://xmrchain.net/api/block/%s", strconv.Itoa(number))
	resp, err := http.Get(url)
	if err != nil {
		return 404, returnBlock
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return 404, returnBlock
	}

	var block data.BlockInfo
	if err := json.Unmarshal(body, &block); err != nil {
		fmt.Println("cannot unmarshal JSON")
		return 404, returnBlock
	} else if block.Status == "fail" {
		return 404, returnBlock
	} else {
		return 200, block
	}

}
