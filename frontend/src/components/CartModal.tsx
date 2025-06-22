import type { CartItem } from "../types/MenuItem";

export function CartModal({
    cart,
    onClose,
    onOrder,
    onIncrease,
    onDecrease,
}: {
    cart: CartItem[];
    onClose: () => void;
    onOrder: () => void;
    onIncrease: (id: number, sizeLabel: string) => void;
    onDecrease: (id: number, sizeLabel: string) => void;
}) {
    const total = cart.reduce((sum, item) => sum + item.selectedSize.price * item.count, 0);

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-[90%] max-w-md p-6 animate-fade-in">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">カート内容</h2>
            {cart.length === 0 ? <p className="text-gray-500 text-center">カートは空です</p> : (
              <ul className="space-y-4">
                {cart.map(item => (
                    <li key={item.id} style={{ marginBottom: '1rem' }}>
                        <div className="flex justify-between items-center mb-1">
                        <span className="font-medium">{item.name} - {item.selectedSize.label}</span>
                        <div className="flex items-center gap-2">
                            <button 
                              onClick={() => onDecrease(item.id, item.selectedSize.label)}
                              className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                            >
                              −
                            </button>
                            <span className="min-w-[2rem] text-center">{item.count}</span>
                            <button 
                              onClick={() => onIncrease(item.id, item.selectedSize.label)}
                              className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                            >
                              ＋
                            </button>
                        </div>
                        </div>
                        <p className="text-sm text-gray-600">小計: ¥{item.selectedSize.price * item.count}</p>
                    </li>
                    ))}
              </ul>
            )}
            <p className="text-right font-semibold mt-4">合計: ¥{total}</p>
            <div className="flex justify-end gap-4 mt-6">
              <button 
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                閉じる
              </button>
              <button 
                onClick={onOrder}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                注文を送る
              </button>
            </div>
          </div>
        </div>
      );
}