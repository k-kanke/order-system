import type { CartItem } from "../types/MenuItem";

type FooterTab = 'cart' | 'menu' | 'call';

export function FooterTabBar({
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
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <button
                    onClick={() => {
                        onChange('cart');
                        onCartOpen();
                    }}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        position: 'relative',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                >
                    <span style={{ fontSize: '24px' }}>🛒</span>
                    {cartCount > 0 && (
                        <span
                            style={{
                            position: 'absolute',
                            top: '0px',
                            right: '0px',
                            backgroundColor: 'red',
                            color: 'white',
                            borderRadius: '9999px',
                            width: '16px',
                            height: '16px',
                            fontSize: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            }}
                        >
                            {cartCount}
                        </span>
                    )}

                    <span style={{ fontSize: '12px', marginTop: '4px' }}>カート</span>
                </button>
            </div>

            {/* メニュー */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <button
                    onClick={() => onChange('menu')}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        position: 'relative',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    <span style={{ fontSize: '24px' }}>📋</span>
                    <span style={{ fontSize: '12px', marginTop: '4px' }}>メニュー</span>
                </button>
            </div>

            {/* 呼び出し */}
            <div>
                <button
                    onClick={() => onChange('call')}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        position: 'relative',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    <span style={{ fontSize: '24px' }}>🔔</span>
                    <span style={{ fontSize: '12px', marginTop: '4px' }}>呼び出し</span>
                </button>
            </div>
        </footer>
    )
}