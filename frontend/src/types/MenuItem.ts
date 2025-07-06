export type Tab = 'ゴルフ' | 'ドリンク' | 'フード';

{/*
export type SubCategory =
  'おすすめ' | 'ビール' | 'ソフトドリンク' | 'サワー' | 'ハイボール' | 'ワイン' |
  '軽食' | '揚げ物' | 'ご飯もの' | 'デザート';
*/}

export type SubCategory = string;

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

export type Product = {
  productId: string;
  productName: string;
  price: string;
  url: string;
};

export type MenuCategory = {
  id: string;
  name: string;
  products: Product[];
};

export type SubCategory2 = {
  id: string;
  name: string;
  children: MenuCategory[];
};

export type TopCategory = {
  id: string;
  name: string;
  code: string;
  children: SubCategory2[];
};
