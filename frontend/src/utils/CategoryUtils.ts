import type { MenuItem, Product } from "../types/MenuItem";

export function topLevelCategoryFromCode(categoryIdOrCode: string): 'ドリンク' | 'フード' | 'その他' {
    // 部門コードが "d" で始まる → ドリンク、"f" → フード
    if (categoryIdOrCode.startsWith('d')) {
      return 'ドリンク';
    } else if (categoryIdOrCode.startsWith('f')) {
      return 'フード';
    } else {
      return 'その他';
    }
}

// 再帰的に呼び出し
export function flattenCategories(categories: any[], topLevelCode: string | null = null): MenuItem[] {
    let items: MenuItem[] = [];

    for (const category of categories) {
        const currentCode = category.code;
        const currentTopTab = currentCode.startsWith('d') ? 'ドリンク' : 'フード';
        const topCode = topLevelCode || currentCode;

        if (category.products) {
            for (const product of category.products) {
                items.push({
                    id: parseInt(product.productId),
                    name: product.productName,
                    category: currentTopTab,
                    imageUrl: product.url,
                    subCategory: category.name,
                    sizes: [
                    {
                        label: 'デフォルト',
                        price: parseInt(product.price),
                    },
                    ],
                    isRecommended: false,
                });
            }
        }

        if (category.children) {
            items = items.concat(flattenCategories(category.children, topCode));
        }
    }

    return items;
}

export function convertProductToMenuItem(
  product: Product,
  categoryName: string,      // 例: 'ドリンク'
  subCategory: string,   // 例: 'ビール'
  // menuName: string           // 例: 'アサヒスーパードライ'
): MenuItem {
  return {
    id: Number(product.productId),
    name: product.productName,
    category: categoryName as "ドリンク" | "フード",
    subCategory,
    sizes: [
      {
        label: "default",
        price: Number(product.price),
      },
    ],
    imageUrl: product.url || "/placeholder.jpg",
    isRecommended: false, // 必要に応じて付与
  };
}
