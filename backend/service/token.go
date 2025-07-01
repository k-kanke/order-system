package service

import (
	"bytes"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"os"
	"sync"
	"time"
)

var (
	cachedToken     string
	cachedTokenTime time.Time
	mu              sync.Mutex
)

func GetAccessTokenWithCache() (string, error) {
	mu.Lock()
	defer mu.Unlock()

	// cacheが存在し、1hour以内なら再利用
	if cachedToken != "" && time.Since(cachedTokenTime) < time.Hour {
		return cachedToken, nil
	}

	// 新しく取得
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
	json.Unmarshal(body, &result)

	token, ok := result["access_token"].(string)
	if !ok {
		return "", fmt.Errorf("access_token not found")
	}

	// cacheに保存
	cachedToken = token
	cachedTokenTime = time.Now()

	return token, nil
}
