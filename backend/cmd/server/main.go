package main

import (
	"log"

	"github.com/k-kanke/order-system/config"
	"github.com/k-kanke/order-system/db"
	"github.com/k-kanke/order-system/router"
	_ "github.com/lib/pq"
)

func main() {
	// Load environment variables
	config.LoadEnv()

	if err := db.Init(); err != nil {
		log.Fatalf("failed to initialize DB: %v", err)
	}

	r := router.SetupRouter()
	if err := r.Run(":8080"); err != nil {
		log.Fatal(err)
	}
}
