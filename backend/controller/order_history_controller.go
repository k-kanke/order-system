package controller

import (
	"context"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/k-kanke/order-system/db"
)

type OrderHistoryItem struct {
	OrderID     string `json:"order_id"`
	ProductID   int    `json:"product_id"`
	ProductName string `json:"product_name"`
	Quantity    int    `json:"quantity"`
	SizeLabel   string `json:"size_label"`
	Category    string `json:"category"`
	SubCategory string `json:"sub_category"`
	Price       int    `json:"price"`
	CreatedAt   string `json:"created_at"`
}

func GetOrderHistory(c *gin.Context) {
	tableID := c.Query("tableId")
	if tableID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "tableId query param required"})
		return
	}

	rows, err := db.Pool.Query(context.Background(), `
		SELECT 
			o.id, oi.product_id, oi.product_name, oi.quantity, oi.size_label, 
			oi.category, oi.sub_category, oi.price, o.created_at
		FROM orders o
		JOIN order_items oi ON o.id = oi.order_id
		WHERE o.table_id = $1
		ORDER BY o.created_at DESC
	`, tableID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to query order history"})
		return
	}
	defer rows.Close()

	var orders []OrderHistoryItem
	for rows.Next() {
		var o OrderHistoryItem
		if err := rows.Scan(
			&o.OrderID, &o.ProductID, &o.ProductName, &o.Quantity,
			&o.SizeLabel, &o.Category, &o.SubCategory, &o.Price, &o.CreatedAt,
		); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to scan row"})
			return
		}
		orders = append(orders, o)
	}

	c.JSON(http.StatusOK, gin.H{"orders": orders})
}
