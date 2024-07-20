package rest

import (
	"net/http"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/cors"
)

func Serve() {
	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins: []string{"https://www.xmrscan.com", "https://*.xmrscan.com", "https://xmrscan.com"},
		AllowedMethods: []string{"GET"},
		AllowedHeaders: []string{"*"},
	}))

	r.Get("/", GetHome)
	r.Get("/block/{height}", GetBlock)
	r.Get("/transaction/{hash}", GetTx)
	r.Get("/blocks/{page}", GetBlocks)
	r.Get("/mempool", GetMempool)
	r.Get("/search/{query}", GetSearchResult)
	r.Get("/prove/{txhash}/{address}/{viewkey}/{mode}", GetProve)

	http.ListenAndServe(":80", r)
}
