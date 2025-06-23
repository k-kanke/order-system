import type { MenuItem, GolfRoom } from "../types/MenuItem"; 

export const TEST_MENU: MenuItem[] = [
  {
    id: 1,
    name: "唐揚げ",
    imageUrl: "/img/karaage.jpg",
    category: "フード",
    subCategory: '揚げ物',
    isRecommended: true,
    sizes: [
      { label: "S", price: 400 },
      { label: "M", price: 500 },
      { label: "L", price: 600 },
    ],
  },
  {
    id: 2,
    name: "生ビール",
    imageUrl: "/img/beer.jpg",
    category: "ドリンク",
    subCategory: 'ビール',
    isRecommended: true,
    sizes: [
      { label: "グラス", price: 400 },
      { label: "中ジョッキ", price: 600 },
    ],
    anchorId: 'ビール'
  },
  {
    id: 3,
    name: '枝豆',
    imageUrl: '/img/edamame.jpg',
    category: 'フード',
    subCategory: '軽食',
    isRecommended: false,
    sizes: [
        { label: '中', price: 150 },
        { label: '大', price: 300 },
    ],
  },
  {
    id: 4,
    name: '烏龍茶',
    imageUrl: '/img/oolong.jpg',
    category: 'ドリンク',
    subCategory: 'ソフトドリンク',
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
    subCategory: 'サワー',
    isRecommended: false,
    sizes: [
      { label: '1杯', price: 600 },
    ],
    anchorId: 'サワー',
  },
  {
    id: 6,
    name: 'コーラ',
    imageUrl: '/img/beer.jpg',
    category: 'ドリンク',
    subCategory: 'ソフトドリンク',
    isRecommended: false,
    sizes: [
      { label: 'M', price: 400 },
    ],
    anchorId: 'ソフトドリンク',
  },
  {
    id: 7,
    name: 'ハイボール',
    imageUrl: '/img/beer.jpg',
    category: 'ドリンク',
    subCategory: 'ハイボール',
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
    subCategory: 'ワイン',
    isRecommended: true,
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
    subCategory: 'ビール',
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
    subCategory: 'ソフトドリンク',
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
    subCategory: 'ソフトドリンク',
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
    subCategory: 'サワー',
    isRecommended: true,
    sizes: [
      { label: 'M', price: 600 },
    ],
  },
  {
    id: 13,
    name: 'え',
    imageUrl: '/img/beer.jpg',
    category: 'ドリンク',
    subCategory: 'ビール',
    isRecommended: false,
    sizes: [
      { label: 'M', price: 600 },
    ],
  },
];

// 新しく追加するゴルフ部屋のダミーデータ 
export const GOLF_ROOMS: GolfRoom[] = [
    {
      id: 'golf-room-1',
      name: 'スタンダードルーム A',
      pricePerHour: 2000,
      isAvailable: true, // 仮に空き
      description: '気軽に楽しめるスタンダードなゴルフシミュレーションルームです。',
      imageUrl: '/images/golf_room_1.jpg', // ダミー画像URL
    },
    {
      id: 'golf-room-2',
      name: 'プレミアムルーム B',
      pricePerHour: 4000,
      isAvailable: false, // 仮に使用中
      description: '最新設備と快適な空間で本格的なゴルフ体験を。',
      imageUrl: '/images/golf_room_2.jpg', // ダミー画像URL
    },
    {
      id: 'golf-room-3',
      name: 'VIPスイート C',
      pricePerHour: 6000,
      isAvailable: true, // 仮に空き
      description: '広々とした空間でプライベートなゴルフセッションをお楽しみいただけます。',
      imageUrl: '/images/golf_room_3.jpg', // ダミー画像URL
    },
  ];