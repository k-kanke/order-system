package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/k-kanke/order-system/service"
)

func GetMenu(c *gin.Context) {
	token, err := service.GetAccessTokenWithCache()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to get token"})
		return
	}

	categories, err := service.FetchCategoriesWithCache(token)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	products, err := service.FetchProductsWithCache(token)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// data整形
	outputCategories := service.ConvertToOutputCategories(categories)
	outputProducts := service.ConvertToOutputProducts(products)

	// 商品をカテゴリに紐付け
	service.AttachProductsToCategories(outputProducts, outputCategories)

	c.JSON(http.StatusOK, gin.H{
		"categories": outputCategories,
	})
}
