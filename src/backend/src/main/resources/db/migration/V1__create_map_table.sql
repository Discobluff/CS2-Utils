CREATE SCHEMA IF NOT EXISTS map;

CREATE TABLE map.map (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255),
    asset_name VARCHAR(255),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE map.stuff (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255),
    asset_name VARCHAR(255),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE map.team (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255),
    asset_name VARCHAR(255),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE map.lineup (
    id SERIAL PRIMARY KEY,
    map_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (map_id) REFERENCES map.map(id),
    stuff_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (stuff_id) REFERENCES map.stuff(id),
    team_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (team_id) REFERENCES map.team(id),
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