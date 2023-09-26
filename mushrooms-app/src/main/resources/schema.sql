CREATE TABLE mushroom_point (
    id SERIAL PRIMARY KEY,
    type varchar(255) NOT NULL,
    lat  float8 NOT NULL,
    lng  float8 NOT NULL
);
