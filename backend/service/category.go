package service

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
)

func FetchCategories(token string, level string) (interface{}, error) {
	url := fmt.Sprintf("https://api.smaregi.dev/%s/pos/categories?level=%s", os.Getenv("CONTRACT_ID"), level)
	req, _ := http.NewRequest("GET", url, nil)
	req.Header.Add("Authorization", "Bearer "+token)

	res, err := http.DefaultClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer res.Body.Close()

	var result interface{}
	json.NewDecoder(res.Body).Decode(&result)

	return result, nil
}
