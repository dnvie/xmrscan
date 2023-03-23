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
)

const keyServerAddr = "serverAddr"

func GetBlock(r *http.Request) (int, data.Block) {
	ctx := r.Context()
	fmt.Printf("%s: /block/ request: ", ctx.Value(keyServerAddr))

	var returnBlock data.Block
	returnBlock.Status = "fail"

	blockNumberString := r.URL.Path[len("/block/"):]
	_, err := strconv.Atoi(blockNumberString)
	if err != nil {
		fmt.Printf("invalid\n")
		return 404, returnBlock
	} else {
		fmt.Printf("%s\n", blockNumberString)
		url := fmt.Sprintf("https://xmrchain.net/api/block/%s", blockNumberString)
		resp, err := http.Get(url)
		if err != nil {
			return 404, returnBlock
		}
		defer resp.Body.Close()

		body, err := io.ReadAll(resp.Body)
		if err != nil {
			return 404, returnBlock
		}

		var block data.Block
		if err := json.Unmarshal(body, &block); err != nil {
			fmt.Println("cannot unmarshal JSON")
			return 404, returnBlock
		} else if block.Status == "fail" {
			return 404, returnBlock
		} else {
			return 200, block
		}
	}
}

func GetTx(r *http.Request) (int, data.Tx) {
	ctx := r.Context()
	fmt.Printf("%s: /transaction/ request: ", ctx.Value(keyServerAddr))

	var returnTx data.Tx
	returnTx.Status = "fail"

	txNumberString := r.URL.Path[len("/transaction/"):]
	fmt.Printf("%s\n", txNumberString)

	url := fmt.Sprintf("https://xmrchain.net/api/transaction/%s", txNumberString)
	resp, err := http.Get(url)
	if err != nil {
		return 404, returnTx
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return 404, returnTx
	}

	var tx data.Tx
	if err := json.Unmarshal(body, &tx); err != nil {
		fmt.Println("cannot unmarshal JSON")
		return 404, returnTx
	} else if tx.Status == "fail" {
		return 404, returnTx
	} else {
		return 200, tx
	}
}

func GetBlocks(r *http.Request, page int) (int, data.Blocks) {
	ctx := r.Context()
	fmt.Printf("%s: /blocks2/ request: \n", ctx.Value(keyServerAddr))

	var returnBlocks data.Blocks
	height := GetNetworkInfo().Data.Height - 1 - page*25

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
