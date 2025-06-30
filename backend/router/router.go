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
	}

	return r
}
