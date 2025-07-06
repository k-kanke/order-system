import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import Header from "../components/Header";
import { Tabs } from "../components/Tabs";
//import { MenuGrid } from "../components/MenuGrid";
import { FooterBar } from "../components/FooterBar";
import type { MenuItem, CartItem, Tab, GolfRoom, SubCategory, TopCategory } from "../types/MenuItem";
import { CartModal } from "../components/CartModal";
import { SelectedItemModal } from "../components/SelectedItemModal";
import { GOLF_ROOMS } from "../data/testMenu";
import { GolfRoomGrid } from "../components/GolfRoomGrid";
import { BookingModal } from "../components/BookingModal";
import { FooterTabBar } from "../components/FooterTabBar";
import { CategorySidebar } from "../components/CategorySidebar";
import { convertProductToMenuItem, flattenCategories } from "../utils/CategoryUtils";
import { MainCategoryBlock } from "../components/MainCategoryBlock";

export function HomePage() {
    const [topTab, setTopTab] = useState<Tab>('ドリンク');
    const [cart, setCart] = useState<CartItem[]>([]); // カートの中身
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
    const [orderHistory, setOrderHistory] = useState<CartItem[][]>([]); // 注文ごとに配列で管理（注文履歴に表示する用）
    const [showFloatingBar, setShowFloatingBar] = useState(true);
    const [selectedGolfRoom, setSelectedGolfRoom] = useState<GolfRoom | null>(null);
    const [bottomTab, setBottomTab] = useState<'menu' | 'cart' | 'call'>('menu');
    const [sidebarCategory, setSidebarCategory] = useState<SubCategory>('おすすめ');
    const [manualHighlight, setManualHighlight] = useState(true);
    // const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

    const [hasDrinkOrder, setHasDrinkOrder] = useState(false);
    const [hasFoodOrder, setHasFoodOrder] = useState(false);

    const [categories, setCategories] = useState<TopCategory[]>([]);


    const scrollTimeoutRef = useRef<number | null>(null); 
    const mainContentScrollRef = useRef<HTMLDivElement>(null);

    {/*
    const currentSidebarCategories = useMemo(() => {
      if (topTab === 'ドリンク') {
        return ['おすすめ', ...(hasDrinkOrder ? ['おかわり'] : []), 'ビール', 'サワー', 'ワイン', 'ハイボール', 'ソフトドリンク'] as SubCategory[];
      } else if (topTab === 'フード') {
        return ['おすすめ', ...(hasFoodOrder ? ['おかわり'] : []), '軽食', '揚げ物', 'ご飯もの', 'デザート'] as SubCategory[];
      }
      return [];
    }, [topTab, hasDrinkOrder, hasFoodOrder]);
    */}

    const currentSidebarCategories = useMemo(() => {
      const currentTopCategory = categories.find(c => c.name === topTab);
      if (!currentTopCategory) return [];
  
      const base = currentTopCategory.children.flatMap(sub => sub.children.map(menu => menu.name));
      const specials = ['おすすめ'];
      if (topTab === 'ドリンク' && hasDrinkOrder) specials.push('おかわり');
      if (topTab === 'フード' && hasFoodOrder) specials.push('おかわり');
      return [...specials, ...base];
    }, [categories, topTab, hasDrinkOrder, hasFoodOrder]); 

    // topTabが変更されたら、sidebarCategoryを適切な初期値に設定
    useEffect(() => {
      if (topTab === 'ドリンク') { 
        setSidebarCategory('おすすめ');
      } else if (topTab === 'フード') {
        setSidebarCategory('おすすめ')
      }
    }, [topTab])

    useEffect(() => {
      // タブ変更時に「おすすめ」で固定
      setSidebarCategory('おすすめ');
      setManualHighlight(true);

      const element = mainContentScrollRef.current?.querySelector(`#おすすめ`);
      if (element && mainContentScrollRef.current) {
        const headerOffset = 120;
        const elementPosition = element.getBoundingClientRect().top + mainContentScrollRef.current.scrollTop;
        const offsetPosition = elementPosition - headerOffset;

        isProgrammaticScroll.current = true;
        mainContentScrollRef.current.scrollTo({
          top: offsetPosition,
          behavior: 'auto',
        });
        setTimeout(() => {
          isProgrammaticScroll.current = false;
        }, 500);
      } 
    
      const timeout = setTimeout(() => {
        setManualHighlight(false); 
      }, 300); 
    
      return () => clearTimeout(timeout);
    }, [topTab]);

    // 現在はtestMenu.tsで定義したものを利用してるから今後拡張する
    {/*
    const filteredMenu = menuItems.filter(item => {
      // topTabが「ゴルフ」の場合
      if (topTab === 'ゴルフ') {
        return false;
      }

      return item.category === topTab;
    });
    */}

    // api叩いてデータ取得
    useEffect(() => {
      async function fetchMenu() {
        const res = await fetch("http://localhost:8080/api/menu")
        const json = await res.json();
        const { categories } = json;

        // debug
        console.log("[debug] categories: ", categories)
        setCategories(categories)

        const transformedMenu = flattenCategories(categories);

        // debug
        console.log("[debug] transformedMenu: ", transformedMenu)

        // setMenuItems(transformedMenu); 
      }

      fetchMenu();
    }, [])

    // スクロールスパイのロジック
    useEffect(() => {
      if (!mainContentScrollRef.current || (topTab !== 'ドリンク' && topTab !== 'フード')) {
        return; // ドリンク、フードタブでない時は監視しない
      }

      const observerOptions = {
        root: mainContentScrollRef.current, // スクロールする要素
        rootMargin: '0px 0px -40% 0px', 
        threshold: 0.1,
      };

      const observer = new IntersectionObserver((entries) => {
        if (isProgrammaticScroll.current || manualHighlight) return;

        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const categoryId = entry.target.id as SubCategory;
            if (currentSidebarCategories.includes(categoryId)) {
              setSidebarCategory(categoryId);
              return;
            }
          }
        });
      }, observerOptions);

      // 監視対象の要素を全て登録
      currentSidebarCategories.forEach(category => {
        const element = mainContentScrollRef.current?.querySelector(`#${category}`);
        if (element) {
          observer.observe(element);
        }
      });

      // クリーンアップ
      return () => {
        observer.disconnect();
      };
    }, [topTab, currentSidebarCategories]);

    const isProgrammaticScroll = useRef(false);

    const scrollToCategory = (category: SubCategory) => {
      const element = mainContentScrollRef.current?.querySelector(`#${category}`);
      if (element) {
        if (mainContentScrollRef.current !== null) {
          const headerOffset = 120;
          const elementPosition = element.getBoundingClientRect().top + mainContentScrollRef.current.scrollTop;
          const offsetPosition = elementPosition - headerOffset;
          mainContentScrollRef.current.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      }
    };

    // サイドバーのタブをクリックした時のスクロール処理
    const handleSidebarCategoryChange = useCallback((category: SubCategory) => {
      setSidebarCategory(category); // サイドバーの選択状態を更新
      setManualHighlight(true); 

      if (!mainContentScrollRef.current) {
        return;
      }

      isProgrammaticScroll.current = true;

      scrollToCategory(category);

      setTimeout(() => {
        isProgrammaticScroll.current = false;
        setManualHighlight(false);
      }, 500);
    }, []);

    const showFloatingBarRef = useRef(showFloatingBar);

    useEffect(() => {
      showFloatingBarRef.current = showFloatingBar;
    }, [showFloatingBar]);

    useEffect(() => {
      const handleScroll = () => {
        console.log(showFloatingBarRef.current);
        // スクロール中：タブを非表示
        if  (showFloatingBarRef.current) {
          setShowFloatingBar(false);
          showFloatingBarRef.current = false;
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

      const currentMenuGridRef = mainContentScrollRef.current;
      if (currentMenuGridRef) {
        currentMenuGridRef.addEventListener("scroll", handleScroll);
      }

      return () => {
        if (currentMenuGridRef) {
          currentMenuGridRef.removeEventListener("scroll", handleScroll);
        }
        
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      };
    }, [showFloatingBar]);

    useEffect(() => {
        document.body.style.overflow = isHistoryOpen ? 'hidden' : 'auto';
    }, [isHistoryOpen]);

    const increaseCount = (id: number, sizeLabel: string)  => {
      setCart(prev => prev
        .map(item =>
          item.id === id && item.selectedSize.label === sizeLabel 
            ? {...item, count: item.count + 1} 
            : item
      ));
    };

    const decreaseCount = (id: number, sizeLabel: string) => {
      setCart(prev => prev
        .map(item => item.id === id && item.selectedSize.label === sizeLabel  ? {...item, count: item.count - 1} : item)
        .filter(item => item.count > 0)
      );
    };

    const onRemove = (id: number, sizeLabel: string) => {
      setCart(prev => prev.filter(item => !(item.id === id && item.selectedSize.label === sizeLabel)))
    }
 
    const handleOrder = () => {
        // 注文履歴に一回一回のオーダー単位で追加
        setOrderHistory(prev => [[...cart], ...prev]);

        // カートにドリンクがあれば「おかわり」タブを表示
        if (cart.some(item => item.category === 'ドリンク')) {
          setHasDrinkOrder(true);
        }

        if (cart.some(item => item.category === 'フード')) {
          setHasFoodOrder(true);
        }

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

    // おすすめメニュー抽出
    // const recommendedItems = filteredMenu.filter(item => item.isRecommended);

    return (
        <div className="h-screen w-screen flex flex-col">
          
          <div className="fixed top-0 left-0 right-0 bg-white z-50">
            <Header 
              onCheckout={() => alert('会計へ')} // 会計処理を記述
              onHistoryOpen={() => setIsHistoryOpen(true)}
            />
            {/* 上部のタブ */}
            <Tabs selected={topTab} onChange={setTopTab} />
          </div>

          <div 
            // ref={mainContentScrollRef}
            className="flex flex-1"
            style={{ 
              marginTop: "120px",
              marginBottom: showFloatingBar ? "60px" : "60px",
              overflow: 'hidden',
            }}
          >
            <div className="flex flex-1 h-full">
              {/* ゴルフタブ以外の時にCategorySidebarを表示 */}
              {(topTab === 'ドリンク' || topTab === 'フード') && (
                <CategorySidebar
                  selected={sidebarCategory}
                  onChange={handleSidebarCategoryChange}
                  categories={currentSidebarCategories}
                />
              )}

              <div
                ref={mainContentScrollRef}
                className="flex-1 overflow-y-auto"
              >
                {/* tabに応じてMenuGridとGolfRoomGridを切り替える */}
                {topTab === 'ゴルフ' ? (
                  <GolfRoomGrid
                    rooms={GOLF_ROOMS}
                    onBook={handleBookGolfRoom}
                  />
                ) : (
                  <div className="flex-1 overflow-y-auto bg-white">
                    {categories
                      .filter(cat => {
                        if (topTab === 'ドリンク') {
                          return cat.code.startsWith('d')
                        }
                        if (topTab === 'フード') {
                          return cat.code.startsWith('f')
                        }
                      })
                      .map(cat => (
                        <MainCategoryBlock
                          key={cat.id}
                          category={cat}
                          onSelectProduct={(product) => {
                            // productをcartモーダルに合うように型を変更
                            const item = convertProductToMenuItem(
                              product,
                              topTab,
                              cat.name as SubCategory,     
                              // product.productName
                            );
                            setSelectedItem(item);
                          }}
                        />
                      ))
                    }
                    {/*
                    <MenuGrid
                      items={filteredMenu}
                      recomendedItems={recommendedItems}
                      onConfirm={setSelectedItem}
                      topTab={topTab}
                      orderHistory={orderHistory}
                    />
                    */}
                  </div>
                )}
              </div>
            </div>
          </div>
                
          {selectedItem && (
            <SelectedItemModal
              item={selectedItem}
              onClose={() => setSelectedItem(null)}
              onConfirm={(item, count, selectedSize) => {
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

          {topTab !== 'ゴルフ' && (
            <div
              className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 ${
                showFloatingBar ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
              }`}
            >
              <FooterBar 
                cart={cart} // カートに何か入っている時はバッジ表示。カートに入ってるかどうか確認用 
                onCartOpen={() => setIsCartOpen(true)}
                onOrderConfirm={handleOrder}
              />
            </div>
          )}

          <FooterTabBar 
            selected={bottomTab}
            onChange={setBottomTab}
            cart={cart} // カートに何か入っている時はバッジ表示。カートに入ってるかどうか確認用 
            onCartOpen={() => setIsCartOpen(true)}
          />

          
          {isCartOpen && (
            <div className="fixed inset-0 z-[1000]">
              <CartModal
                cart={cart}
                onClose={() => setIsCartOpen(false)}
                onIncrease={increaseCount}
                onDecrease={decreaseCount}
                onRemove={onRemove}
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

                {orderHistory
                  .slice()
                  .reverse()
                  .map((order, index) => {
                    const orderTotal = order.reduce((sum, item) => sum + item.selectedSize.price * item.count, 0);
                    return (
                        <div 
                          key={index} 
                          style={{
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                            marginBottom: '1rem',
                            padding: '1rem',
                            backgroundColor: '#f9f9f9'
                          }}>
                        <h4 style={{ marginBottom: '0.5rem' }}>📝 注文 </h4>
                        {order.map(item => (
                            <div 
                              key={`${item.id}-${item.selectedSize.label}`} 
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: '0.25rem'
                              }}>
                            <span style={{ flex: 1 }}>{item.name}</span>
                            <span
                              style={{
                                minWidth: "90px",
                                textAlign: "right",
                                color: "#555",
                              }}
                            >
                              ¥{item.selectedSize.price} × {item.count}
                            </span>
                            <span
                              style={{
                                minWidth: "80px",
                                textAlign: "right",
                                fontWeight: "bold",
                              }}
                            >¥{item.selectedSize.price * item.count}
                            </span>
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