package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/k-kanke/order-system/service"
)

// アクセストークン取得
func GetToken(c *gin.Context) {
	token, err := service.GetAccessTokenWithCache()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"access_token": token})
}

// 商品一覧取得
func GetProducts(c *gin.Context) {
	token, err := service.GetAccessTokenWithCache()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to get token"})
		return
	}

	data, err := service.FetchProductsWithCache(token)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, data)
}

// 部門一覧取得
func GetCategories(c *gin.Context) {
	token, err := service.GetAccessTokenWithCache()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to get token"})
		return
	}

	allCategories, err := service.FetchCategoriesWithCache(token)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, allCategories)
}
