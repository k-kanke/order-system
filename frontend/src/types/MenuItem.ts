export type Tab = 'おすすめ' | '全て' | 'フード' | 'ドリンク' | 'ゴルフ';

export type MenuItem = {
    id: number;
    name: string;
    imageUrl: string;
    category: 'フード' | 'ドリンク';
    isRecommended: boolean;
    sizes: {
      label: string;
      price: number;
    }[];
  };
  
export type CartItem = MenuItem & {
  count: number;
  selectedSize: {
    label: string;
    price: number;
  };
};

export interface GolfRoom {
  id: string; // 部屋の識別子
  name: string; // 部屋の名前
  pricePerHour: number;
  isAvailable: boolean;
  description: string;
  imageUrl: string; 
}