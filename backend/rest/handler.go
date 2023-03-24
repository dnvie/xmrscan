package rest

import (
	"net/http"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
)

func Serve() {
	r := chi.NewRouter()
	r.Use(middleware.Logger)

	r.Get("/block/{height}", GetBlock)
	r.Get("/transaction/{hash}", GetTx)
	r.Get("/price", GetPrice)
	r.Get("/networkInfo", GetNetworkInfo)
	r.Route("/blocks", func(r chi.Router) {
		r.Get("/", GetBlocks)
		r.Get("/{page}", GetBlocks)
	})

	http.ListenAndServe(":3000", r)
}
