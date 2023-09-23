CREATE TABLE mushroom_point (
    id SERIAL PRIMARY KEY,
    type varchar(255) NOT NULL,
    x_coordinates  float8 NOT NULL,
    y_coordinates  float8 NOT NULL
);
