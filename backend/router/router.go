package router

import (
	"github.com/gin-gonic/gin"
	"github.com/k-kanke/order-system/controller"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()

	api := r.Group("/api")
	{
		api.POST("/token", controller.GetToken)
		api.GET("/products", controller.GetProducts)
		api.GET("/categories", controller.GetCategories)
		api.GET("/menu", controller.GetMenu)
	}

	return r
}
