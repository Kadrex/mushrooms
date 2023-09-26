CREATE TABLE mushroom_point (
    id SERIAL PRIMARY KEY,
    name varchar(255) NOT NULL,
    details varchar(255),
    lat  float8 NOT NULL,
    lng  float8 NOT NULL
);
