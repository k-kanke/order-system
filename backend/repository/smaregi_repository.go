package repository

import (
	"bytes"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"os"
)

func RequestAccessToken() (string, error) {
	data := url.Values{}
	data.Set("grant_type", "client_credentials")
	data.Set("scope", "pos.products:read")

	req, _ := http.NewRequest("POST",
		fmt.Sprintf("https://id.smaregi.dev/app/%s/token", os.Getenv("CONTRACT_ID")),
		bytes.NewBufferString(data.Encode()))

	auth := base64.StdEncoding.EncodeToString([]byte(fmt.Sprintf("%s:%s", os.Getenv("CLIENT_ID"), os.Getenv("CLIENT_SECRET"))))
	req.Header.Add("Authorization", "Basic "+auth)
	req.Header.Add("Content-Type", "application/x-www-form-urlencoded")

	res, err := http.DefaultClient.Do(req)
	if err != nil {
		return "", err
	}
	defer res.Body.Close()

	body, _ := io.ReadAll(res.Body)
	var result map[string]interface{}
	// ログ出力
	fmt.Println("Response Body:", string(body))
	json.Unmarshal(body, &result)

	token, ok := result["access_token"].(string)
	if !ok {
		return "", fmt.Errorf("access_token not found")
	}
	return token, nil
}

func GetProducts(token string) (interface{}, error) {
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
