package service

import "github.com/k-kanke/order-system/repository"

func GetAccessToken() (string, error) {
	return repository.RequestAccessToken()
}

func FetchProducts(token string) (interface{}, error) {
	return repository.GetProducts(token)
}
