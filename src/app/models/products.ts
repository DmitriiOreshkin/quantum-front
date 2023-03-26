export interface IProduct {
  id?: string; // СЕРВИСНОЕ
  name: string;
  price: number;
  lastUpdate?: string;
  type: string;
  imageUrl: string;
  inStock?: number;
  description: string;
}
