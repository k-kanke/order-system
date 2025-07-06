import type { MenuCategory, Product } from "../types/MenuItem";

export function ExpandableMenuCard({
  category,
  onSelectProduct,
  forceExpanded = false,
}: {
  category: MenuCategory;
  onSelectProduct: (product: Product) => void;
  forceExpanded?: boolean;
}) {
  const expanded = forceExpanded || false;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-full">
      <div className="p-2">
        <h4 className="text-base font-bold">{category.name}</h4>
      </div>

      {(expanded || forceExpanded) && (
        <div className="border-t border-gray-200 p-2">
          {category.products.map(product => (
            <div
              key={product.productId}
              className="flex justify-between items-center py-1 px-2 hover:bg-gray-100 rounded cursor-pointer"
              onClick={() => onSelectProduct(product)}
            >
              <span className="text-sm">{product.productName}</span>
              <span className="text-sm font-bold">¥{product.price}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
    