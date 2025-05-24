import { useState } from "react";
import Header from "./components/Header";
import { Tabs } from "./components/Tabs";
import { MenuGrid } from "./components/MenuGrid";
import { FooterBar } from "./components/FooterBar";

const TEST_MENU = [
  { id: 1, name: '唐揚げ', price: 500, imageUrl: '/img/karaage.jpg' },
  { id: 2, name: 'ビール', price: 600, imageUrl: '/img/beer.jpg' },
  // 他のアイテムも追加可能
];


function App() {
  const [tab, setTab] = useState<'おすすめ' | '全て' | 'フード' | 'ドリンク'>('おすすめ');
  const [total, setTotal] = useState(0);

  const handleAdd = (id: number) => {
    const item = TEST_MENU.find(m => m.id === id);
    if (item) setTotal(prev => prev + item.price);
  };

  return (
    <div style={{ paddingBottom: '80px' }}>
      <Header />
      <Tabs selected={tab} onChange={setTab} />
      <MenuGrid items={TEST_MENU} onAdd={handleAdd} />
      <FooterBar total={total} onCheckout={() => alert('会計へ')} />
    </div>
  );
}

export default App;

