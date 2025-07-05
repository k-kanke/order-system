package router

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/k-kanke/order-system/controller"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()

	// CORS設定
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"}, // フロント側のポート
		AllowMethods:     []string{"GET", "POST", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type"},
		AllowCredentials: true,
	}))

	api := r.Group("/api")
	{
		api.POST("/token", controller.GetToken)
		api.GET("/products", controller.GetProducts)
		api.GET("/categories", controller.GetCategories)
		api.GET("/menu", controller.GetMenu)
	}

	return r
}
