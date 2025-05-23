-- Drop if exists
DROP TABLE IF EXISTS orders, menu_items, menus CASCADE;

-- Create Menus table
CREATE TABLE menus (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

-- Create Menu Items table
CREATE TABLE menu_items (
  id SERIAL PRIMARY KEY,
  menu_id INTEGER REFERENCES menus(id),
  name VARCHAR(255) NOT NULL,
  price INTEGER NOT NULL
);

-- Create Orders table
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  menu_item_id INTEGER REFERENCES menu_items(id),
  quantity INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample Data
INSERT INTO menus (name) VALUES ('ドリンク'), ('フード');

-- ドリンク
INSERT INTO menu_items (menu_id, name, price) VALUES
  (1, 'アイスコーヒー', 280),
  (1, 'ホットコーヒー', 280),
  (1, 'ウーロン茶', 250),
  (1, 'メロンソーダ', 300);

-- フード
INSERT INTO menu_items (menu_id, name, price) VALUES
  (2, 'チーズバーガー', 750),
  (2, 'カレーライス', 850),
  (2, 'オムライス', 880),
  (2, 'ミートソースパスタ', 900),
  (2, 'グラタン', 830),
  (2, 'サラダ', 400);

INSERT INTO orders (menu_item_id, quantity) VALUES
  (1, 2),
  (3, 1);
