export interface MapInfo {
  name: string;
  id: string;
  asset_name: string;
}

export interface NewMap {
  name: string;
  asset_name: string;
  asset: File;
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
  id: number | undefined;
  map_id: string;
  stuff_id: string;
  team_id: string;
  video_link: string;
  video_start: Number | undefined;
  video_end: Number | undefined;
  coords_x_start: number;
  coords_y_start: number;
  coords_x_end: number;
  coords_y_end: number;
  click_type: string;
  position: string;
  jump: boolean;
  movement: string;
}