package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/k-kanke/order-system/service"
	"github.com/k-kanke/order-system/util"
)

func GetToken(c *gin.Context) {
	token, err := service.GetAccessToken()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"access_token": token})
}

func GetProducts(c *gin.Context) {
	token := util.ExtractBearerToken(c.GetHeader("Authorization"))
	data, err := service.FetchProducts(token)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, data)
}
