package service

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"sync"
	"time"

	"github.com/k-kanke/order-system/model"
)

var (
	cachedProducts     []model.Product
	cachedProductsTime time.Time
	productsMu         sync.Mutex
	productsTTL        = 30 * time.Minute
)

func FetchProductsWithCache(token string) ([]model.Product, error) {
	productsMu.Lock()
	defer productsMu.Unlock()

	if cachedProducts != nil && time.Since(cachedProductsTime) < productsTTL {
		return cachedProducts, nil
	}

	// debug
	log.Println("[debug] try to fetch products ")

	url := fmt.Sprintf("https://api.smaregi.dev/%s/pos/products", os.Getenv("CONTRACT_ID"))
	req, _ := http.NewRequest("GET", url, nil)
	req.Header.Add("Authorization", "Bearer "+token)

	res, err := http.DefaultClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer res.Body.Close()

	var result []model.Product
	if err := json.NewDecoder(res.Body).Decode(&result); err != nil {
		return nil, err
	}

	// キャッシュに保存
	cachedProducts = result
	cachedProductsTime = time.Now()

	return result, nil
}
