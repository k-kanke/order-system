import { useState } from "react";
import Header from "./components/Header";
import { Tabs } from "./components/Tabs";
import { MenuGrid } from "./components/MenuGrid";
import { FooterBar } from "./components/FooterBar";
import type { MenuItem, CartItem } from "./types/MenuItem";
import { CartModal } from "./components/CartModal";
import { SelectedItemModal } from "./components/SelectedItemModal";

// サンプルデータ（DBから取得するように後で変更）
const TEST_MENU = [
  { id: 1, name: '唐揚げ', price: 500, imageUrl: '/img/karaage.jpg' },
  { id: 2, name: 'ビール', price: 600, imageUrl: '/img/beer.jpg' },
  { id: 3, name: 'スパ', price: 500, imageUrl: '/img/karaage.jpg' },
  { id: 4, name: 'ポテト', price: 500, imageUrl: '/img/karaage.jpg' },
  { id: 5, name: 'たこ焼き', price: 500, imageUrl: '/img/karaage.jpg' },
  { id: 6, name: 'めん', price: 500, imageUrl: '/img/karaage.jpg' },
  // 他のアイテムも追加可能
];


function App() {
  const [tab, setTab] = useState<'おすすめ' | '全て' | 'フード' | 'ドリンク'>('おすすめ');
  const [cart, setCart] = useState<CartItem[]>([]); // カートの中身
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [total, setTotal] = useState<number>(0); // 注文確定分だけの合計
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const addToCart = (item: MenuItem) => {
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

  return (
    <div style={{ paddingBottom: '80px' }}>
      <div style={{ position: 'sticky', top: 0, background: '#fff', zIndex: 1000 }}>
        <Header />
        <Tabs selected={tab} onChange={setTab} />
      </div>
      <MenuGrid 
        items={TEST_MENU} 
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
      {isCartOpen && (
        <CartModal
          cart={cart}
          onClose={() => setIsCartOpen(false)}
          onIncrease={increaseCount}
          onDecrease={decreaseCount}
          onOrder={() => {
            const orderTotal = cart.reduce((sum, item) => sum + item.price * item.count, 0);
            setTotal(prev => prev + orderTotal); // 注文金額を反映
            setCart([]);
            setIsCartOpen(false);
            alert("注文を確定しました！");
          }}
        />
      )}
    </div>
  );
}

export default App;

