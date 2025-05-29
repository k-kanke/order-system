import { useEffect, useState } from "react";
import Header from "../components/Header";
import { Tabs } from "../components/Tabs";
import { MenuGrid } from "../components/MenuGrid";
import { FooterBar } from "../components/FooterBar";
import type { MenuItem, CartItem } from "../types/MenuItem";
import { CartModal } from "../components/CartModal";
import { SelectedItemModal } from "../components/SelectedItemModal";
import { RecentOrders } from "../components/RecentOrders";

// サンプルデータ（DBから取得するように後で変更）
const TEST_MENU: MenuItem[] = [
    { id: 1, name: '唐揚げ', price: 500, imageUrl: '/img/karaage.jpg', category: 'フード', isRecommended: true },
    { id: 2, name: 'ビール', price: 600, imageUrl: '/img/beer.jpg', category: 'ドリンク', isRecommended: true },
    { id: 3, name: '枝豆', price: 300, imageUrl: '/img/edamame.jpg', category: 'フード', isRecommended: false },
    { id: 4, name: '烏龍茶', price: 400, imageUrl: '/img/oolong.jpg', category: 'ドリンク', isRecommended: false },
    { id: 5, name: 'レモンサワー', price: 600, imageUrl: '/img/beer.jpg', category: 'ドリンク', isRecommended: false },
    { id: 6, name: 'コーラ', price: 600, imageUrl: '/img/beer.jpg', category: 'ドリンク', isRecommended: false },
    { id: 7, name: 'ハイボール', price: 600, imageUrl: '/img/beer.jpg', category: 'ドリンク', isRecommended: true },
    { id: 8, name: '日本酒', price: 600, imageUrl: '/img/beer.jpg', category: 'ドリンク', isRecommended: false },
    { id: 9, name: '梅酒', price: 600, imageUrl: '/img/beer.jpg', category: 'ドリンク', isRecommended: false },
    { id: 10, name: 'あ', price: 600, imageUrl: '/img/beer.jpg', category: 'ドリンク', isRecommended: false },
    { id: 11, name: 'い', price: 600, imageUrl: '/img/beer.jpg', category: 'ドリンク', isRecommended: false },
    { id: 12, name: 'う', price: 600, imageUrl: '/img/beer.jpg', category: 'ドリンク', isRecommended: false },
    { id: 13, name: 'え', price: 600, imageUrl: '/img/beer.jpg', category: 'ドリンク', isRecommended: false },
  ];

export function HomePage() {
    const [tab, setTab] = useState<'おすすめ' | '全て' | 'フード' | 'ドリンク'>('おすすめ');
    const [cart, setCart] = useState<CartItem[]>([]); // カートの中身
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);
    const [total, setTotal] = useState<number>(0); // 注文確定分だけの合計
    const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
    const [recentItems, setRecentItems] = useState<MenuItem[]>([]); // 頼んだものを保存
    const [orderHistory, setOrderHistory] = useState<CartItem[][]>([]); // 注文ごとに配列で管理（注文履歴に表示する用）
    const [showRecent, setShowRecent] = useState(false);

    useEffect(() => {
        document.body.style.overflow = isHistoryOpen ? 'hidden' : 'auto';
    }, [isHistoryOpen]);

    const filteredMenu = TEST_MENU.filter(item => {
    if (tab === 'おすすめ') return item.isRecommended;
    if (tab === 'フード') return item.category === 'フード';
    if (tab === 'ドリンク') return item.category === 'ドリンク';
    return true; // 全て
    });

    const addToCart = (item: MenuItem) => {
    // カート更新
    setCart((prev) => {
        const exiting = prev.find((c) => c.id === item.id);
        if (exiting) {
        return prev.map((c) =>
            c.id === item.id ? {...c, count: c.count + 1} : c
        );
        }
        return [...prev, {...item, count: 1 }];
    });
    };

    const increaseCount = (id: number) => {
    setCart(prev => prev.map(item =>
        item.id === id ? {...item, count: item.count + 1} : item
    ));
    };

    const decreaseCount = (id: number) => {
    setCart(prev => prev
        .map(item => item.id === id ? {...item, count: item.count - 1} : item)
        .filter(item => item.count > 0)
    );
    };

    const handleOrder = () => {
        const orderTotal = cart.reduce((sum, item) => sum + item.price * item.count, 0);
        setTotal(prev => prev + orderTotal); // 注文金額を反映

        // recentItemsにカートを統合
        setRecentItems(prev => {
            const combined = [...cart, ...prev];
            const unique = combined.reduce<MenuItem[]>((acc, item) => {
            if (!acc.find(i => i.id === item.id)) {
                acc.push({ ...item });
            }
            return acc;
            }, []);
            return unique.slice(0, 5);
        });

        // 注文履歴に一回一回のオーダー単位で追加
        setOrderHistory(prev => [[...cart], ...prev]);

        setCart([]);
        setIsCartOpen(false);
        alert("注文が確定しました！");
    };

    // お支払い金額（合計）を計算
    const totalHistoryAmount = orderHistory.reduce((orderSum, order) => {
        return orderSum + order.reduce((sum, item) => sum + item.price * item.count, 0);
    }, 0);
    
    return (
        <div className="relative h-screen overflow-hidden">
          
          <div className="fixed top-0 left-0 right-0 bg-white z-50">
            <Header />
            <Tabs selected={tab} onChange={setTab} />
            {!showRecent && (
              <button
                className="ml-4 text-sm bg-blue-500 text-white px-3 py-1 rounded"
                onClick={() => setShowRecent(true)}
              >
                最近の注文を表示
              </button>
            )}
          </div>

          {showRecent && (
            <div className="fixed pt-[100px] left-0 right-0 z-40 bg-white px-4 shadow">
            <RecentOrders
              items={recentItems}
              onRepeat={(item) => addToCart(item)}
              onClose={() => setShowRecent(false)}
            />
          </div>
          )}

            {/*
            <section>
              <h3 className="text-lg font-semibold mb-2">最近の注文</h3>
              <div className="overflow-x-auto">
                <div className="flex gap-4 w-max">
                  {recentItems.map((item) => (
                    <div
                      key={item.id}
                      className="min-w-[120px] max-w-[110px] flex-shrink-0 border border-gray-300 rounded-lg p-2 bg-white"
                    >
                      <img src={item.imageUrl} alt={item.name} className="w-full rounded" />
                      <div className="text-sm">{item.name}</div>
                      <div className="font-bold text-sm">¥{item.price}</div>
                      <button
                        className="mt-1 w-full text-xs bg-blue-500 text-white py-1 rounded"
                        onClick={() => addToCart(item)}
                      >
                        もう一度注文
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            */} 
          <div 
            className="fixed bottom-[60px] left-0 right-0 overflow-y-auto px-4"
            style={{ 
              top: showRecent 
                ? recentItems.length === 0
                  ? "180px"
                  : "280px" 
                : "150px",
            }}
          >
            {/* 料理一覧：縦スクロールでカード表示 */}
            <MenuGrid
              items={filteredMenu}
              onAdd={addToCart}
              onConfirm={setSelectedItem}
            />
          </div>
                
          {selectedItem && (
            <SelectedItemModal
              item={selectedItem}
              onClose={() => setSelectedItem(null)}
              onConfirm={(item, count) => {
                  for (let i = 0; i < count; i++) {
                    addToCart(item);
                  }
                  setSelectedItem(null);
              }}
            />
          )}
    
          <FooterBar 
            total={total}
            cart={cart} // カートに何か入っている時はバッジ表示。カートに入ってるかどうか確認用 
            onCheckout={() => alert('会計へ')} 
            onCartOpen={() => setIsCartOpen(true)}
            onHistoryOpen={() => setIsHistoryOpen(true)}
          />

          
          {isCartOpen && (
            <div className="fixed inset-0 z-[1000] bg-white">
              <CartModal
                cart={cart}
                onClose={() => setIsCartOpen(false)}
                onIncrease={increaseCount}
                onDecrease={decreaseCount}
                onOrder={handleOrder}
              />
            </div>
          )}

          {isHistoryOpen && (
            <div style={{
                position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: '#fff', zIndex: 9999, overflowY: 'auto', padding: '1rem'
              }}>
                <button
                  onClick={() => setIsHistoryOpen(false)}
                  style={{ position: 'absolute', top: 10, right: 10, fontSize: '1.2rem' }}
                >
                  ✖
                </button>
                <h2>注文履歴</h2>

                {orderHistory.length === 0 && <p>まだ注文はありません。</p>}

                {orderHistory.map((order, index) => {
                    const orderTotal = order.reduce((sum, item) => sum + item.price * item.count, 0);
                    return (
                        <div key={index} style={{
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        marginBottom: '1rem',
                        padding: '1rem',
                        backgroundColor: '#f9f9f9'
                        }}>
                        <h4 style={{ marginBottom: '0.5rem' }}>📝 注文 {orderHistory.length - index}</h4>
                        {order.map(item => (
                            <div key={item.id + Math.random()} style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '0.25rem'
                            }}>
                            <span>{item.name}</span>
                            <span>¥{item.price} × {item.count}</span>
                            <span>¥{item.price * item.count}</span>
                            </div>
                        ))}
                        <hr style={{ margin: '0.5rem 0' }} />
                        <div style={{ textAlign: 'right', fontWeight: 'bold' }}>
                            合計: ¥{orderTotal}
                        </div>
                        </div>
                    );
                })}
                
                <div style={{
                    padding: '1rem',
                    borderTop: '2px solid #000',
                    backgroundColor: '#fff',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    textAlign: 'right'
                }}>
                    お支払い金額： ¥{totalHistoryAmount}
                </div>
                
              </div>
          )}
        </div>
      );
}