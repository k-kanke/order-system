export type MenuItem = {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    category: 'フード' | 'ドリンク';
    isRecommended: boolean;
  };
  
export type CartItem = MenuItem & {
  count: number;
};
