package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/k-kanke/order-system/model"
	"github.com/k-kanke/order-system/service"
)

func GetMenu(c *gin.Context) {
	token, err := service.GetAccessTokenWithCache()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to get token"})
		return
	}

	levels := []string{"1", "2", "3"}
	var allCategories []*model.Category
	for _, level := range levels {
		categories, err := service.FetchCategories(token, level)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		allCategories = append(allCategories, categories...)
	}

	products, err := service.FetchProducts(token)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// data整形
	outputCategories := service.ConvertToOutputCategories(allCategories)
	outputProducts := service.ConvertToOutputProducts(products)

	// 商品をカテゴリに紐付け
	service.AttachProductsToCategories(outputProducts, outputCategories)

	c.JSON(http.StatusOK, gin.H{
		"categories": outputCategories,
	})
}
