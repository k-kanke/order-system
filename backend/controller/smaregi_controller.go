package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
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
