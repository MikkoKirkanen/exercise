ALTER TABLE hedgehog
  ADD COLUMN name TEXT NOT NULL,
  ADD COLUMN age INTEGER CHECK (age >= 0),
  ADD COLUMN gender TEXT CHECK (gender IN ('male', 'female', 'unknown')) NOT NULL,
  ADD COLUMN coordinates GEOMETRY(Point, 4326);

ALTER TABLE hedgehog
  ADD PRIMARY KEY (id);