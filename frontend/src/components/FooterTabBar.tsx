import type { CartItem } from "../types/MenuItem";

type FooterTab = 'cart' | 'menu' | 'call';

export function FooterTabBar({
    selected,
    onChange,
    cart, 
    onCartOpen,
}: {
    selected: FooterTab;
    onChange: (tab: FooterTab) => void;
    cart: CartItem[];
    onCartOpen: () => void;
}) {
    const cartCount = cart.reduce((sum, item) => sum + item.count, 0);

    return (
        <footer className="fixed bottom-0 left-0 right-0 bg-white border-t z-50 flex justify-around items-center h-16">
            {/* カードボタン */}
            <div>
                <button
                    onClick={() => {
                        onChange('cart');
                        onCartOpen();
                    }}
                >
                    🛒
                    {cartCount > 0 && (
                        <span className="absolute -top-1 -right-2 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
                            {cartCount}
                        </span>
                    )}
                </button>
                <span>カート</span>
            </div>

            {/* メニュー */}
            <div>
                <button
                    onClick={() => onChange('menu')}
                    className={`text-xl ${selected === 'menu' ? 'text-blue-500' : 'text-gray-500'}`}
                >
                    📋  
                </button>
                <span className="text-xs">メニュー</span>
            </div>

            {/* 呼び出し */}
            <div>
                <button
                    onClick={() => onChange('call')}
                    className={`text-xl ${selected === 'call' ? 'text-blue-500' : 'text-gray-500'}`}
                >
                    🔔 
                </button>
                <span>呼び出し</span>
            </div>
        </footer>
    )
}