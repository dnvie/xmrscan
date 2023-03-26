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
		AllowedOrigins:   []string{"https://*", "http://*"},
		AllowedMethods:   []string{"GET"},
		AllowedHeaders:   []string{"Accept", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: false,
		MaxAge:           300,
	}))

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
