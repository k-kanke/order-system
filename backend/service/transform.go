package service

import (
	"github.com/k-kanke/order-system/model"
)

func ConvertToOutputCategories(categories []*model.Category) []*model.OutputCategory {
	categoryMap := make(map[string]*model.OutputCategory)

	// OutputCategory を作成してマップに登録
	for _, c := range categories {
		categoryMap[c.CategoryID] = &model.OutputCategory{
			ID:       c.CategoryID,
			Name:     c.CategoryName,
			Code:     c.CategoryCode,
			Children: []*model.OutputCategory{},
			Products: []model.OutputProduct{},
		}
	}

	// ツリー構造に組み立て
	var roots []*model.OutputCategory
	for _, c := range categories {
		if c.ParentCategoryID == "" || categoryMap[c.ParentCategoryID] == nil {
			roots = append(roots, categoryMap[c.CategoryID])
		} else {
			parent := categoryMap[c.ParentCategoryID]
			if parent != nil {
				parent.Children = append(parent.Children, categoryMap[c.CategoryID])
			}
		}
	}
	return roots
}

func ConvertToOutputProducts(products []model.Product) []model.OutputProduct {
	var result []model.OutputProduct
	for _, p := range products {
		result = append(result, model.OutputProduct{
			ID:         p.ProductID,
			Name:       p.ProductName,
			Price:      p.Price,
			CategoryID: p.CategoryID,
			URL:        *p.URL,
		})
	}
	return result
}
