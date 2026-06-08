export interface Game {
  id: number;
  title: string;
  genre: string;
  platform: string;
  releaseYear: number;
  developer: string;
  publisher: string;
  rating: number;
  description: string;
}

export type NewGame = Omit<Game, 'id'>;
