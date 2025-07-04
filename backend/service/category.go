package service

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	"github.com/k-kanke/order-system/model"
)

func FetchCategories(token string, level string) ([]*model.Category, error) {
	url := fmt.Sprintf("https://api.smaregi.dev/%s/pos/categories?level=%s", os.Getenv("CONTRACT_ID"), level)
	req, _ := http.NewRequest("GET", url, nil)
	req.Header.Add("Authorization", "Bearer "+token)

	res, err := http.DefaultClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer res.Body.Close()

	var categories []*model.Category
	if err := json.NewDecoder(res.Body).Decode(&categories); err != nil {
		return nil, err
	}

	return categories, nil
}
