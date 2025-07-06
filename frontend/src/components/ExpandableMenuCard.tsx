import { useState } from "react";
import type { MenuCategory, MenuItem, Product } from "../types/MenuItem";
import { convertProductToMenuItem } from "../utils/CategoryUtils";

export function ExpandableMenuCard({
    category,
    // onSelectProduct,
    onConfirm,
    topCategoryName,
}: {
    category: MenuCategory;
    // onSelectProduct: (product: Product, count: number) => void;
    onConfirm: (item: MenuItem, count: number, selectedSize: { label: string; price: number }) => void;
    topCategoryName: string;
}) {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [count, setCount] = useState(1);
    const [selectedSize, setSelectedSize] = useState<{ label: string; price: number } | null>(null);

    const handleProductSelect = (product: Product) => {
        setSelectedProduct(product);
        setSelectedSize({ label: "default", price: Number(product.price) });
        setCount(1);
    };
    
    const handleConfirm = () => {
        console.log("[debug] handleConfirm が実行されました ")
        if (selectedProduct && selectedSize) {
            const item = convertProductToMenuItem(
                selectedProduct,
                topCategoryName, // or "フード"（必要に応じて）
                category.name,
                // selectedProduct.productName
            );
            onConfirm(item, count, selectedSize);
            setSelectedProduct(null); // リセット
        }
    };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-full p-3">
        {/* 上部の画像 */}
        <div className="w-full aspect-square bg-gray-100 overflow-hidden rounded-lg">
            <img
                src="/placeholder.jpg"
                // alt={category.name}
                className="w-full h-full object-cover"
            />
        </div>
        

        {/* 商品一覧 */}
        <div className="space-y-1">
            {category.products.map((product) => (
                <div
                    key={product.productId}
                    className={`flex justify-between items-center py-1 px-2 rounded cursor-pointer ${
                    selectedProduct?.productId === product.productId
                        ? "bg-blue-100 font-bold"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => handleProductSelect(product)}
                >
                    <span className="text-sm">{product.productName}</span>
                    <span className="text-sm font-bold">¥{product.price}</span>
                </div>
            ))}
        </div>
        
        
        {/* 数量選択 */}
        {selectedProduct && (
            <div className="mt-3 flex flex-col items-center gap-2">
                <div className="flex justify-center items-center gap-4">
                    <button
                        onClick={() => setCount((c) => (c > 1 ? c - 1 : 1))}
                        className="text-lg w-8 h-8 rounded-full bg-gray-200"
                    >
                        -
                    </button>
                    <span className="text-xl font-bold">{count}</span>
                    <button
                        onClick={() => setCount((c) => c + 1)}
                        className="text-lg w-8 h-8 rounded-full bg-gray-200"
                    >
                        +
                    </button>
                </div>

                <button
                    onClick={handleConfirm}
                    className="mt-2 w-full py-2 bg-blue-500 text-white font-semibold rounded shadow"
                >
                    カートに追加
                </button>
            </div>
        )}
    </div>
  );
}
