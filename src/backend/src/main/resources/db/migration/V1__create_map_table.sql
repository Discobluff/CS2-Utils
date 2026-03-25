CREATE SCHEMA IF NOT EXISTS cs2;

CREATE TABLE cs2.map (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255),
    asset_name VARCHAR(255),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE cs2.stuff (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255),
    asset_name VARCHAR(255),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE cs2.team (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255),
    asset_name VARCHAR(255),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE cs2.lineup (
    id SERIAL PRIMARY KEY,
    map_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (map_id) REFERENCES cs2.map(id),
    stuff_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (stuff_id) REFERENCES cs2.stuff(id),
    team_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (team_id) REFERENCES cs2.team(id),
    video_link VARCHAR(255),
    video_start INTEGER,
    video_end INTEGER,
    coords_x_start FLOAT,
    coords_y_start FLOAT,
    coords_x_end FLOAT,
    coords_y_end FLOAT,
    click_type VARCHAR(255),
    position VARCHAR(255),
    jump BOOLEAN,
    movement VARCHAR(255),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

INSERT INTO cs2.team (id, name, asset_name, created_at, updated_at) VALUES ('ct', 'CT', 'ct', NOW(), NOW());
INSERT INTO cs2.team (id, name, asset_name, created_at, updated_at) VALUES ('t', 'T', 't', NOW(), NOW());

INSERT INTO cs2.stuff (id, name, asset_name, created_at, updated_at) VALUES ('smoke', 'Smoke', 'smoke', NOW(), NOW());
INSERT INTO cs2.stuff (id, name, asset_name, created_at, updated_at) VALUES ('flash', 'Flash', 'flash', NOW(), NOW());
INSERT INTO cs2.stuff (id, name, asset_name, created_at, updated_at) VALUES ('molotov', 'Molotov', 'molotov', NOW(), NOW());
INSERT INTO cs2.stuff (id, name, asset_name, created_at, updated_at) VALUES ('he', 'HE Grenade', 'smoke', NOW(), NOW());

INSERT INTO cs2.map (id, name, asset_name, created_at, updated_at) VALUES ('mirage', 'Mirage', 'mirage', NOW(), NOW());
INSERT INTO cs2.map (id, name, asset_name, created_at, updated_at) VALUES ('inferno', 'Inferno', 'inferno', NOW(), NOW());
INSERT INTO cs2.map (id, name, asset_name, created_at, updated_at) VALUES ('dust2', 'Dust 2', 'dust2', NOW(), NOW());