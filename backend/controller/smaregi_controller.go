package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/k-kanke/order-system/model"
	"github.com/k-kanke/order-system/service"
)

func GetToken(c *gin.Context) {
	token, err := service.GetAccessTokenWithCache()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"access_token": token})
}

func GetProducts(c *gin.Context) {
	token, err := service.GetAccessTokenWithCache()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to get token"})
		return
	}

	data, err := service.FetchProducts(token)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, data)
}

func GetCategories(c *gin.Context) {
	token, err := service.GetAccessTokenWithCache()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to get token"})
		return
	}

	levels := []string{"1", "2", "3"}
	var allCategories []model.Category

	for _, level := range levels {
		categories, err := service.FetchCategories(token, level)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		allCategories = append(allCategories, categories...)
	}

	c.JSON(http.StatusOK, allCategories)
}
