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
