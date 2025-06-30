package main

import (
	"log"

	"github.com/k-kanke/order-system/config"
	"github.com/k-kanke/order-system/router"
	_ "github.com/lib/pq"
)

func main() {
	config.LoadEnv()
	r := router.SetupRouter()
	if err := r.Run(":8080"); err != nil {
		log.Fatal(err)
	}
}
