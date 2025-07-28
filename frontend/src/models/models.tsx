export interface Person {
  id: string;
  name: string;
  mass?: number;
  height?: number;
  gender?: string;
}

export interface Starship {
  id: string;
  name: string;
  model?: string;
  crew: number;
  passengers?: number;
  starshipClass?: string;
}

export type GameEntity = Person | Starship;

export interface GameState {
  leftCard: GameEntity | null;
  rightCard: GameEntity | null;
  winner: 'left' | 'right' | 'tie' | null;
  category: 'people' | 'starships';
  leftScore: number;
  rightScore: number;
}
