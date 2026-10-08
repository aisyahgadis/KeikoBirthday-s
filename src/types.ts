export interface MemoryItem {
  id: string;
  num: string;
  title?: string;
  text: string;
  category?: string;
  sticker?: string;
  color?: string;
}

export interface Candle {
  id: number;
  x: number;
  y: number;
  isLit: boolean;
  color: string;
  flameDelay: string;
  flameDuration: string;
}

export type CakeFlavor = "strawberry" | "lavender" | "chocolate" | "matcha";

export interface WishEntry {
  id: string;
  name: string;
  wish: string;
  date: string;
  stars: number;
}
