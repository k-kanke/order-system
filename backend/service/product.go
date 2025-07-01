package service

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
)

func GetProducts() (interface{}, error) {
	token, err := GetAccessTokenWithCache()
	if err != nil {
		return nil, err
	}

	url := fmt.Sprintf("https://api.smaregi.dev/%s/pos/products", os.Getenv("CONTRACT_ID"))
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
