package main

import (
	"backend/rest"
	"context"
	"errors"
	"fmt"
	"net"
	"net/http"
)

const keyServerAddr = "serverAddr"

func main() {
	mux := http.NewServeMux()

	mux.HandleFunc("/price", rest.GetPrice)
	mux.HandleFunc("/block/", rest.GetBlock)
	mux.HandleFunc("/transaction/", rest.GetTx)
	mux.HandleFunc("/blocks", rest.GetBlocks)

	ctx := context.Background()
	server := &http.Server{
		Addr:    ":3333",
		Handler: mux,
		BaseContext: func(l net.Listener) context.Context {
			ctx = context.WithValue(ctx, keyServerAddr, l.Addr().String())
			return ctx
		},
	}

	err := server.ListenAndServe()
	if errors.Is(err, http.ErrServerClosed) {
		fmt.Printf("server closed\n")
	} else if err != nil {
		fmt.Printf("error listening for server: %s\n", err)
	}
}
