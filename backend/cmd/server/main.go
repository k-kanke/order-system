package main

import (
	"github.com/k-kanke/order-system/config"
	_ "github.com/lib/pq"
)

func main() {
	config.LoadEnv()

}
