package service

import "github.com/k-kanke/order-system/model"

func AttachProductsToCategories(products []model.OutputProduct, categories []*model.OutputCategory) {
	categoryMap := make(map[string]*model.OutputCategory)
	flattenCategories(categories, categoryMap)

	for _, p := range products {
		if cat, ok := categoryMap[p.CategoryID]; ok {
			cat.Products = append(cat.Products, p)
		}
	}
}

func flattenCategories(categories []*model.OutputCategory, result map[string]*model.OutputCategory) {
	for _, cat := range categories {
		result[cat.ID] = cat
		if len(cat.Children) > 0 {
			flattenCategories(cat.Children, result)
		}
	}
}
