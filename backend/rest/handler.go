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
		AllowedOrigins:   []string{"https://www.xmrscan.com", "http://www.xmrscan.com", "https://*.xmrscan.com", "http://*.xmrscan.com", "https://xmrscan.com", "http://xmrscan.com"},
		AllowedMethods:   []string{"GET"},
		AllowedHeaders:   []string{"Accept", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: false,
		MaxAge:           300,
	}))

	r.Get("/block/{height}", GetBlock)
	r.Get("/transaction/{hash}", GetTx)
	r.Get("/networkInfo", GetNetworkInfo)
	r.Route("/blocks", func(r chi.Router) {
		r.Get("/", GetBlocks)
		r.Get("/{page}", GetBlocks)
	})
	r.Get("/mempool", GetMempool)
	r.Get("/search/{query}", GetSearchResult)

	http.ListenAndServe(":80", r)
}
