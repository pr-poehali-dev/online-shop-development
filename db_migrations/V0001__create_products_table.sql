
CREATE TABLE t_p84866830_online_shop_developm.products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price INTEGER NOT NULL,
  old_price INTEGER,
  category VARCHAR(100) NOT NULL DEFAULT 'Другое',
  tag VARCHAR(50),
  rating DECIMAL(2,1) NOT NULL DEFAULT 5.0,
  reviews_count INTEGER NOT NULL DEFAULT 0,
  image_url TEXT,
  description TEXT,
  in_stock BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO t_p84866830_online_shop_developm.products
  (name, price, old_price, category, tag, rating, reviews_count, image_url, description)
VALUES
  ('Sneaker Pro X', 12990, 18990, 'Обувь', 'sale', 4.8, 234,
   'https://cdn.poehali.dev/projects/16f09a0e-b28e-480b-bb47-7ff3efc1b963/files/695664ec-d934-488a-b6aa-e046869c0067.jpg',
   'Профессиональные кроссовки для города и спорта'),
  ('Urban Jacket', 8490, NULL, 'Одежда', 'new', 4.6, 87,
   'https://cdn.poehali.dev/projects/16f09a0e-b28e-480b-bb47-7ff3efc1b963/files/3031e7a7-6fcf-450c-8c63-53836cbd2d4a.jpg',
   'Стильная городская куртка из премиум материала'),
  ('Cyber Bag', 5990, 7490, 'Аксессуары', 'sale', 4.9, 412,
   'https://cdn.poehali.dev/projects/16f09a0e-b28e-480b-bb47-7ff3efc1b963/files/6ef9eaa2-cb79-4e4f-99f2-99dbb1248dc2.jpg',
   'Вместительная сумка в киберпанк стиле'),
  ('Neon Cap', 2490, NULL, 'Аксессуары', 'new', 4.5, 56,
   'https://cdn.poehali.dev/projects/16f09a0e-b28e-480b-bb47-7ff3efc1b963/files/695664ec-d934-488a-b6aa-e046869c0067.jpg',
   'Кепка с неоновой вышивкой'),
  ('Tech Pants', 6990, 9990, 'Одежда', 'sale', 4.7, 189,
   'https://cdn.poehali.dev/projects/16f09a0e-b28e-480b-bb47-7ff3efc1b963/files/3031e7a7-6fcf-450c-8c63-53836cbd2d4a.jpg',
   'Технологичные брюки с карманами'),
  ('Glow Watch', 24990, NULL, 'Аксессуары', 'new', 4.9, 67,
   'https://cdn.poehali.dev/projects/16f09a0e-b28e-480b-bb47-7ff3efc1b963/files/6ef9eaa2-cb79-4e4f-99f2-99dbb1248dc2.jpg',
   'Светящиеся часы из нержавеющей стали'),
  ('Street Hoodie', 4990, 6490, 'Одежда', NULL, 4.4, 321,
   'https://cdn.poehali.dev/projects/16f09a0e-b28e-480b-bb47-7ff3efc1b963/files/695664ec-d934-488a-b6aa-e046869c0067.jpg',
   'Уличное худи оверсайз'),
  ('Future Boots', 15490, NULL, 'Обувь', 'new', 4.8, 143,
   'https://cdn.poehali.dev/projects/16f09a0e-b28e-480b-bb47-7ff3efc1b963/files/3031e7a7-6fcf-450c-8c63-53836cbd2d4a.jpg',
   'Футуристичные ботинки на платформе');
