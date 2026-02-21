CREATE SCHEMA IF NOT EXISTS map;

CREATE TABLE map.map (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255),
    asset_name VARCHAR(255),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);