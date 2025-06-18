export type Tab = 'ゴルフ' | 'ドリンク' | 'フード';

export type SubCategory =
  'おすすめ' | 'ビール' | 'サワー' | 'ワイン' | 'ハイボール' | 'ソフトドリンク' |
  '軽食' | '揚げ物' | 'ご飯もの' | 'デザート';

export type MenuItem = {
    id: number;
    name: string;
    imageUrl: string;
    category: 'フード' | 'ドリンク';
    subCategory: SubCategory;
    isRecommended: boolean;
    sizes: {
      label: string;
      price: number;
    }[];
    anchorId?: string; // サイドタブを押すとここに飛ぶという目印。
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