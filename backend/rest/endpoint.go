package rest

import (
	"backend/data"
	"backend/service"
	"encoding/json"
	"io"
	"net/http"

	"github.com/go-chi/chi"
)

func GetBlock(w http.ResponseWriter, r *http.Request) {
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

func GetSearchResult(w http.ResponseWriter, r *http.Request) {
	response, searchResult := service.GetSearchResult(r)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(response)

	if response == 200 {
		searchResult, err := json.Marshal(searchResult)
		if err != nil {
			io.WriteString(w, "Received Invalid Search Result JSON Object")
		} else {
			w.Write(searchResult)
		}
	} else {
		io.WriteString(w, "\nError: Search Query is not a valid Transaction/Block Hash or Block Height\n")
	}
}

func GetHome(w http.ResponseWriter, r *http.Request) {
	response, home := service.GetHome(r)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(response)

	if response == 200 {
		homeResult, err := json.Marshal(home)
		if err != nil {
			io.WriteString(w, "Received Invalid Home JSON Object")
		} else {
			w.Write(homeResult)
		}
	} else {
		io.WriteString(w, "\nError: Cannot load Latest Blocks and Latest Txs\n")
	}
}

func GetProve(w http.ResponseWriter, r *http.Request) {
	modeParam := chi.URLParam(r, "mode")
	response, proveOutputs := service.GetProveResults(r, modeParam)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(response)

	if response == 200 {
		proveOutputsRes, err := json.Marshal(proveOutputs)
		if err != nil {
			io.WriteString(w, "Received Invalid JSON Object")
		} else {
			w.Write(proveOutputsRes)
		}
	} else {
		io.WriteString(w, "\nError: Cannot Prove Transaction\n")
	}
}
