export interface Movie {
  _id: string;
  name: string;
  english_name: string;
  genre_ids: string;
  genres: string;
  title: string;
  format: string;
  age: string;
  release: string;
  duration: string;
  director: string;
  performer: string;
  description: string;
  poster: string;
  thumbnail: string;
  trailer: string;
  rating: number;
  status: number;
  times: Time[];
  created_at: string;
  updated_at: string;
}
export interface Time {
  time: string;
  showtime_id: string;
}

export interface MovieListConfig {
  genre_id?: number;
  status?: number;
  key_search?: string;
}
