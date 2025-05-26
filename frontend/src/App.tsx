import { useState } from "react";
import Header from "./components/Header";
import { Tabs } from "./components/Tabs";
import { MenuGrid } from "./components/MenuGrid";
import { FooterBar } from "./components/FooterBar";
import type { MenuItem, CartItem } from "./types/MenuItem";
import { CartModal } from "./components/CartModal";
import { SelectedItemModal } from "./components/SelectedItemModal";

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
];


function App() {
  const [tab, setTab] = useState<'おすすめ' | '全て' | 'フード' | 'ドリンク'>('おすすめ');
  const [cart, setCart] = useState<CartItem[]>([]); // カートの中身
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [total, setTotal] = useState<number>(0); // 注文確定分だけの合計
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [recentItems, setRecentItems] = useState<MenuItem[]>([]); // 頼んだものを保存

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

    // 最新の注文履歴に追加(先頭に追加し最大５件までを格納)
    /*
    setRecentItems((prev) => {
      const withoutDuplicate = prev.filter((i) => i.id !== item.id);
      return [item, ...withoutDuplicate].slice(0, 5);
    });
    */
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

    setCart([]);
    setIsCartOpen(false);
    alert("注文が確定しました！");
  };

  return (
    <div style={{ paddingBottom: '80px' }}>
      <div style={{ position: 'sticky', top: 0, background: '#fff', zIndex: 1000 }}>
        <Header />
        <Tabs selected={tab} onChange={setTab} />
      </div>

      {recentItems.length > 0 && (
        <section style={{ padding: "1rem" }}>
          <h3 style={{ marginBottom: "0.5rem" }}>🔁 最近の注文</h3>
          <div style={{
            display: 'flex',
            overflowX: 'auto',
            gap: '1rem',
            paddingBottom: '0.5rem',
          }}>
            {recentItems.map(item => (
              <div
                key={item.id}
                style={{
                  minWidth: '120px',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  padding: '0.5rem',
                  flexShrink: 0,
                  background: '#fff'
                }}
              >
                <img src={item.imageUrl} alt={item.name} style={{ width: '100%', borderRadius: '4px' }} />
                <div style={{ fontSize: '0.9rem' }}>{item.name}</div>
                <div style={{ fontWeight: 'bold' }}>¥{item.price}</div>
                <button onClick={() => addToCart(item)}>もう一度注文</button>
              </div>
            ))}
          </div>
        </section>
      )}

      <MenuGrid 
        items={filteredMenu} 
        onAdd={(item) => addToCart(item)}
        onConfirm={(item) => setSelectedItem(item)}
      />
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
        onCheckout={() => alert('会計へ')} 
        onCartOpen={() => setIsCartOpen(true)}
      />
      <div style={{ position: 'sticky', top: 0, background: '#fff', zIndex: 1000 }}>
        {isCartOpen && (
          <CartModal
            cart={cart}
            onClose={() => setIsCartOpen(false)}
            onIncrease={increaseCount}
            onDecrease={decreaseCount}
            onOrder={handleOrder}
            /*
            onOrder={() => {
              const orderTotal = cart.reduce((sum, item) => sum + item.price * item.count, 0);
              setTotal(prev => prev + orderTotal); // 注文金額を反映
              setCart([]);
              setIsCartOpen(false);
              alert("注文を確定しました！");
            }}
            */
          />
        )}
      </div>
    </div>
  );
}

export default App;

