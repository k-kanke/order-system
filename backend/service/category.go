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
	cachedCategories     []*model.Category
	cachedCategoriesTime time.Time
	categoriesMu         sync.Mutex
	categoriesTTL        = 10 * time.Minute
)

func FetchCategoriesWithCache(token string) ([]*model.Category, error) {
	categoriesMu.Lock()
	defer categoriesMu.Unlock()

	if cachedCategories != nil && time.Since(cachedCategoriesTime) < categoriesTTL {
		return cachedCategories, nil
	}

	// debug
	log.Println("[debug] try to fetch categories ")

	levels := []string{"1", "2", "3"}
	var all []*model.Category

	for _, level := range levels {
		url := fmt.Sprintf("https://api.smaregi.dev/%s/pos/categories?level=%s", os.Getenv("CONTRACT_ID"), level)
		req, _ := http.NewRequest("GET", url, nil)
		req.Header.Add("Authorization", "Bearer "+token)

		res, err := http.DefaultClient.Do(req)
		if err != nil {
			return nil, err
		}
		defer res.Body.Close()

		var cats []*model.Category
		if err := json.NewDecoder(res.Body).Decode(&cats); err != nil {
			return nil, err
		}
		all = append(all, cats...)
	}

	// キャッシュ保存
	cachedCategories = all
	cachedCategoriesTime = time.Now()

	return all, nil
}
