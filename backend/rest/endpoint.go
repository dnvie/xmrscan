package rest

import (
	"backend/data"
	"backend/service"
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	"github.com/go-chi/chi"
)

func GetBlock(w http.ResponseWriter, r *http.Request) {
	fmt.Println(chi.URLParam(r, "height"))
	response, block := service.GetBlock(r)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(response)
	if block.Status == "fail" {
		io.WriteString(w, "\nError: Invalid Block ID\n")
	} else {
		blockJSON, err := json.Marshal(block)
		if err != nil {
			io.WriteString(w, "Received Invalid Block JSON Object")
		} else {
			w.Write(blockJSON)
		}
	}
}

func GetTx(w http.ResponseWriter, r *http.Request) {
	response, tx := service.GetTx(r)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(response)
	if tx.Status == "fail" {
		io.WriteString(w, "\nError: Invalid Transaction ID\n")
	} else {
		txJSON, err := json.Marshal(tx)
		if err != nil {
			io.WriteString(w, "Received Invalid Transaction JSON Object")
		} else {
			w.Write(txJSON)
		}
	}
}

func GetPrice(w http.ResponseWriter, r *http.Request) {
	response, price := service.GetPrice(r)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(response)
	if response == 200 {
		priceJSON, err := json.Marshal(price)
		if err != nil {
			io.WriteString(w, "Received Invalid Price JSON Object")
		} else {
			w.Write(priceJSON)
		}
	} else {
		io.WriteString(w, "\nError: Could not fetch Price Data\n")
	}
}

func GetNetworkInfo(w http.ResponseWriter, r *http.Request) {
	response, info := service.GetNetworkInfo()
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(response)
	if response == 200 {
		infoJSON, err := json.Marshal(info)
		if err != nil {
			io.WriteString(w, "Received Invalid Network Info JSON Object")
		} else {
			w.Write(infoJSON)
		}
	} else {
		io.WriteString(w, "\nError: Could not fetch Network Info Data\n")
	}
}

func GetBlocks(w http.ResponseWriter, r *http.Request) {
	var response int
	var blocks data.Blocks

	response, blocks = service.GetBlocks(r)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(response)

	if response == 200 {
		blocksJSON, err := json.Marshal(blocks)
		if err != nil {
			io.WriteString(w, "Received Invalid Blocks JSON Object")
		} else {
			w.Write(blocksJSON)
		}
	} else {
		io.WriteString(w, "\nError: Could not fetch Blocks\n")
	}
}

func GetMempool(w http.ResponseWriter, r *http.Request) {
	var response int
	var mempool data.Mempool

	response, mempool = service.GetMempool()

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(response)

	if response == 200 {
		mempoolJSON, err := json.Marshal(mempool)
		if err != nil {
			io.WriteString(w, "Received Invalid Mempool JSON Object")
		} else {
			w.Write(mempoolJSON)
		}
	} else {
		io.WriteString(w, "\nError: Could not fetch Mempool\n")
	}
}
