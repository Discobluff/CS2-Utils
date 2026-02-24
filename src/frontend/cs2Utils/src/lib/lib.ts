export interface MapInfo {
  name: string;
  id: string;
  asset_name: string;
}

export interface Team {
  name: string;
  id: string;
  asset_name: string;
}

export interface Stuff {
  name: string;
  id: string;
  asset_name: string;
}

export interface Lineup {
  map_id: string;
  stuff_id: string;
  team_id: string;
  video_link: string;
  coords_x: Number;
  coords_y: Number;
  click_type: string;
  position: string;
  jump: boolean;
  movement: string;
}