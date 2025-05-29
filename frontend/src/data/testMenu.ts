import type { MenuItem } from "../types/MenuItem"; 

export const TEST_MENU: MenuItem[] = [
  {
    id: 1,
    name: "唐揚げ",
    imageUrl: "/img/karaage.jpg",
    category: "フード",
    isRecommended: true,
    sizes: [
      { label: "S", price: 400 },
      { label: "M", price: 500 },
      { label: "L", price: 600 },
    ],
  },
  {
    id: 2,
    name: "ビール",
    imageUrl: "/img/beer.jpg",
    category: "ドリンク",
    isRecommended: true,
    sizes: [
      { label: "グラス", price: 400 },
      { label: "中ジョッキ", price: 600 },
    ],
  },
  {
    id: 3,
    name: '枝豆',
    imageUrl: '/img/edamame.jpg',
    category: 'フード',
    isRecommended: false,
    sizes: [
      { label: '大', price: 300 },
      { label: '中', price: 150 },
    ],
  },
  {
    id: 4,
    name: '烏龍茶',
    imageUrl: '/img/oolong.jpg',
    category: 'ドリンク',
    isRecommended: false,
    sizes: [
      { label: 'S', price: 300 },
      { label: 'M', price: 400 },
    ],
  },
  {
    id: 5,
    name: 'レモンサワー',
    imageUrl: '/img/beer.jpg',
    category: 'ドリンク',
    isRecommended: false,
    sizes: [
      { label: '1杯', price: 600 },
    ],
  },
  // 以下も同様に修正（ダミーサイズでOK）
  {
    id: 6,
    name: 'コーラ',
    imageUrl: '/img/beer.jpg',
    category: 'ドリンク',
    isRecommended: false,
    sizes: [
      { label: 'M', price: 400 },
    ],
  },
  {
    id: 7,
    name: 'ハイボール',
    imageUrl: '/img/beer.jpg',
    category: 'ドリンク',
    isRecommended: true,
    sizes: [
      { label: '1杯', price: 600 },
    ],
  },
  {
    id: 8,
    name: '日本酒',
    imageUrl: '/img/beer.jpg',
    category: 'ドリンク',
    isRecommended: false,
    sizes: [
      { label: '1合', price: 600 },
      { label: '2合', price: 1000 },
    ],
  },
  {
    id: 9,
    name: '梅酒',
    imageUrl: '/img/beer.jpg',
    category: 'ドリンク',
    isRecommended: false,
    sizes: [
      { label: 'グラス', price: 600 },
    ],
  },
  {
    id: 10,
    name: 'あ',
    imageUrl: '/img/beer.jpg',
    category: 'ドリンク',
    isRecommended: false,
    sizes: [
      { label: 'M', price: 600 },
    ],
  },
  {
    id: 11,
    name: 'い',
    imageUrl: '/img/beer.jpg',
    category: 'ドリンク',
    isRecommended: false,
    sizes: [
      { label: 'M', price: 600 },
    ],
  },
  {
    id: 12,
    name: 'う',
    imageUrl: '/img/beer.jpg',
    category: 'ドリンク',
    isRecommended: false,
    sizes: [
      { label: 'M', price: 600 },
    ],
  },
  {
    id: 13,
    name: 'え',
    imageUrl: '/img/beer.jpg',
    category: 'ドリンク',
    isRecommended: false,
    sizes: [
      { label: 'M', price: 600 },
    ],
  },
];
