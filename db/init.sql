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

INSERT INTO menu_items (menu_id, name, price) VALUES
  (1, 'コーラ', 300),
  (1, 'オレンジジュース', 350),
  (2, 'ハンバーガー', 700),
  (2, 'ポテト', 400);

INSERT INTO orders (menu_item_id, quantity) VALUES
  (1, 2),
  (3, 1);
