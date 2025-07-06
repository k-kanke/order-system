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
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden w-full p-4 flex-col gap-4">
        {/* 上部の画像 */}
        <div className="w-5/6 mx-auto aspect-square bg-gray-100 overflow-hidden rounded-xl mb-4">
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
                    className={`flex justify-between items-center px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                    selectedProduct?.productId === product.productId
                        ? "bg-blue-100 text-blue-900 font-semibold"
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
            <div className="mt-2 flex flex-col items-center gap-3">
                <div className="flex justify-center items-center gap-4">
                    <button
                        onClick={() => setCount((c) => (c > 1 ? c - 1 : 1))}
                        className="w-9 h-9 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-xl"
                    >
                        -
                    </button>
                    <span className="text-xl font-bold">{count}</span>
                    <button
                        onClick={() => setCount((c) => c + 1)}
                        className="w-9 h-9 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-xl"
                    >
                        +
                    </button>
                </div>

                <button
                    onClick={handleConfirm}
                    className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl shadow transition-colors"
                >
                    カートに追加
                </button>
            </div>
        )}
    </div>
  );
}
