package controller

import (
	"context"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/k-kanke/order-system/db"
)

type OrderItem struct {
	ProductID   int    `json:"productId"`
	ProductName string `json:"productName"`
	Price       int    `json:"price"`
	Quantity    int    `json:"quantity"`
	SizeLabel   string `json:"sizeLabel"`
	Category    string `json:"category"`
	SubCategory string `json:"subCategory"`
}

type OrderRequest struct {
	TableID int         `json:"tableId"`
	Items   []OrderItem `json:"items"`
}

func PostOrder(c *gin.Context) {
	log.Println("[debug] PostOrder呼ばれた!")

	var req OrderRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		log.Printf("[ERROR] ShouldBindJSON: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request body"})
		return
	}

	log.Println("[debug] A")

	if req.TableID == 0 || len(req.Items) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "tableId and items are required"})
		return
	}

	log.Println("[debug] B")

	ctx := context.Background()
	orderID := uuid.New()

	_, err := db.Pool.Exec(
		ctx,
		`INSERT INTO orders (id, table_id) VALUES ($1, $2)`,
		orderID, req.TableID)
	if err != nil {
		log.Printf("[ERROR] Failed to insert order: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to insert order"})
		return
	}

	log.Println("[debug] C")

	for _, item := range req.Items {
		_, err := db.Pool.Exec(
			ctx,
			`INSERT INTO order_items 
				(id, order_id, product_id, product_name, price, quantity, size_label, category, sub_category) 
			 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
			uuid.New(), orderID, item.ProductID, item.ProductName, item.Price, item.Quantity, item.SizeLabel, item.Category, item.SubCategory,
		)
		if err != nil {
			log.Printf("[ERROR] Failed to db: %v", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to insert order item"})
			return
		}
	}

	log.Println("[debug] D")

	c.JSON(http.StatusOK, gin.H{"message": "order placed", "orderId": orderID})
}
