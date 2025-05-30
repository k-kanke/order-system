import { useEffect, useState, useRef } from "react";
import Header from "../components/Header";
import { Tabs } from "../components/Tabs";
import { MenuGrid } from "../components/MenuGrid";
import { FooterBar } from "../components/FooterBar";
import type { MenuItem, CartItem, Tab, GolfRoom } from "../types/MenuItem";
import { CartModal } from "../components/CartModal";
import { SelectedItemModal } from "../components/SelectedItemModal";
import { RecentOrders } from "../components/RecentOrders";
import { GOLF_ROOMS, TEST_MENU } from "../data/testMenu";
import { GolfRoomGrid } from "../components/GolfRoomGrid";
import { BookingModal } from "../components/BookingModal";

export function HomePage() {
    const [tab, setTab] = useState<Tab>('おすすめ');
    const [cart, setCart] = useState<CartItem[]>([]); // カートの中身
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);
    // const [total, setTotal] = useState<number>(0); // 注文確定分だけの合計
    const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
    const [recentItems, setRecentItems] = useState<CartItem[]>([]); // 頼んだものを保存
    const [orderHistory, setOrderHistory] = useState<CartItem[][]>([]); // 注文ごとに配列で管理（注文履歴に表示する用）
    const [showRecent, setShowRecent] = useState(false);
    const [showFloatingBar, setShowFloatingBar] = useState(true);
    const [selectedGolfRoom, setSelectedGolfRoom] = useState<GolfRoom | null>(null);

    const scrollTimeoutRef = useRef<number | null>(null); 
    const menuGridRef = useRef<HTMLDivElement>(null);

    const filteredMenu = TEST_MENU.filter(item => {
      if (tab === 'おすすめ') return item.isRecommended;
      if (tab === 'フード') return item.category === 'フード';
      if (tab === 'ドリンク') return item.category === 'ドリンク';
      return true; // 全て
    });

    useEffect(() => {
      const handleScroll = () => {
        // スクロール中：タブを非表示
        if (showFloatingBar) {
          setShowFloatingBar(false);
        }

        // タイマーをリセット
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        // スクロール停止時にタブを再表示
        scrollTimeoutRef.current = setTimeout(() => {
          setShowFloatingBar(true);
        }, 500); // 300ms後に「停止」と見なす
      };

      const currentMenuGridRef = menuGridRef.current;
      if (currentMenuGridRef) {
        currentMenuGridRef.addEventListener("scroll", handleScroll);
      }

      // window.addEventListener("scroll", handleScroll);

      return () => {
        if (currentMenuGridRef) {
          currentMenuGridRef.removeEventListener("scroll", handleScroll);
        }
        // window.removeEventListener("scroll", handleScroll);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      };
    }, [showFloatingBar]);

    useEffect(() => {
        document.body.style.overflow = isHistoryOpen ? 'hidden' : 'auto';
    }, [isHistoryOpen]);

    const addToCart = (item: MenuItem, selectedSize: {label: string; price: number}) => {
      // カート更新
      setCart((prev) => {
          const exiting = prev.find(
            (c) => c.id === item.id && c.selectedSize.label === selectedSize.label
          );
          if (exiting) {
            return prev.map((c) =>
              c.id === item.id && c.selectedSize.label === selectedSize.label
                ? { ...c, count: c.count + 1 }
                : c
            );
          }
          return [
            ...prev, 
            {
              id: item.id,
              name: item.name,
              imageUrl: item.imageUrl,
              category: item.category,
              isRecommended: item.isRecommended,
              selectedSize,
              count: 1,
            } as CartItem,
          ];
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
        // const orderTotal = cart.reduce((sum, item) => sum + item.selectedSize.price * item.count, 0);
        // setTotal(prev => prev + orderTotal); // 注文金額を反映

        // recentItemsにカートを統合
        setRecentItems(prev => {
            const combined = [...cart, ...prev];
            const unique = combined.reduce<CartItem[]>((acc, item) => {
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

    const handleBookGolfRoom = (room: GolfRoom) => {
      setSelectedGolfRoom(room);
    };

    // お支払い金額（合計）を計算
    const totalHistoryAmount = orderHistory.reduce((orderSum, order) => {
        return orderSum + order.reduce((sum, item) => sum + item.selectedSize.price * item.count, 0);
    }, 0);
    
    return (
        <div className="relative h-screen overflow-hidden">
          
          <div className="fixed top-0 left-0 right-0 bg-white z-50">
            <Header 
              onCheckout={() => alert('会計へ')} // 会計処理を記述
              onHistoryOpen={() => setIsHistoryOpen(true)}
            />
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
              onRepeat={(item) => {
                addToCart(item, item.selectedSize);
              }}
              onClose={() => setShowRecent(false)}
            />
          </div>
          )}

          <div 
            ref={menuGridRef}
            className="fixed left-0 right-0 overflow-y-auto px-4"
            style={{ 
              top: showRecent 
                ? recentItems.length === 0
                  ? "180px"
                  : "280px" 
                : "150px",
              bottom: showFloatingBar ? "0px" : "0px",
            }}
          >
            {/* tabに応じてMenuGridとGolfRoomGridを切り替える */}
            {tab === 'ゴルフ' ? (
              <GolfRoomGrid
                rooms={GOLF_ROOMS}
                onBook={handleBookGolfRoom}
              />
            ) : (
              <MenuGrid
                items={filteredMenu}
                onAdd={(item) => {
                  const defaultSize = item.sizes[0]; 
                  addToCart(item, defaultSize);
                }}
                onConfirm={setSelectedItem}
              />
            )}
          </div>
                
          {selectedItem && (
            <SelectedItemModal
              item={selectedItem}
              onClose={() => setSelectedItem(null)}
              onConfirm={(item, count, selectedSize) => {
                addToCart(item, selectedSize);
                setCart(prev => {
                  const existing = prev.find(c => c.id === item.id && c.selectedSize.label === selectedSize.label);
                  if (existing) {
                    return prev.map(c =>
                      c.id === item.id && c.selectedSize.label === selectedSize.label
                        ? { ...c, count: c.count + count }
                        : c
                    );
                  }
                  return [
                    ...prev,
                    {
                      ...item,
                      selectedSize,
                      count,
                    } as CartItem,
                  ];
                });
                setSelectedItem(null);
              }}
            />
          )}

          {tab !== 'ゴルフ' && (
            <div
              className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 ${
                showFloatingBar ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
              }`}
            >
              <FooterBar 
              // total={total}
              cart={cart} // カートに何か入っている時はバッジ表示。カートに入ってるかどうか確認用 
              // onCheckout={() => alert('会計へ')} 
              onCartOpen={() => setIsCartOpen(true)}
              // onHistoryOpen={() => setIsHistoryOpen(true)}
              onOrderConfirm={handleOrder}
              />
            </div>
          )}

          
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
                    const orderTotal = order.reduce((sum, item) => sum + item.selectedSize.price * item.count, 0);
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
                            <span>¥{item.selectedSize.price} × {item.count}</span>
                            <span>¥{item.selectedSize.price * item.count}</span>
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

          {/* ★ BookingModalのレンダリングを追加 ★ */}
          {selectedGolfRoom && (
            <BookingModal
                room={selectedGolfRoom}
                onClose={() => setSelectedGolfRoom(null)}
            />
          )}
        </div>
      );
}