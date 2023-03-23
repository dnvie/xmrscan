package rest

import (
	"backend/data"
	"backend/service"
	"encoding/json"
	"io"
	"net/http"
	"strconv"
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

func GetBlocks(w http.ResponseWriter, r *http.Request) {
	hasPage := r.URL.Query().Has("page")
	page := r.URL.Query().Get("page")

	var response int
	var blocks data.Blocks

	if hasPage {
		pageNum, err := strconv.Atoi(page)
		if err != nil {
			response, blocks = service.GetBlocks(r, 0)
		} else {
			response, blocks = service.GetBlocks(r, pageNum)
		}
	} else {
		response, blocks = service.GetBlocks(r, 0)
	}

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
