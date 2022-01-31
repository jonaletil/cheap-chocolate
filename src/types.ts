// Contain all the types we want to use for this app
export interface ChocolateItems {
  pagination: Pagination;
  data?: DataEntity[] | null;
}
export interface Pagination {
  offset: number;
  limit: number;
  total: number;
}
export interface DataEntity {
  id: string;
  name: string;
  brand: string;
  currency: string;
  prices?: (PricesEntity | null)[] | null;
  nutrition: Nutrition;
}
export interface PricesEntity {
  price: number;
  shop: string;
  link: string;
  unit: string;
  amount: number;
}
export interface Nutrition {
  fat: Fat;
  carbohydrates: Carbohydrates;
  protein: number;
  salt: number;
}
export interface Fat {
  total: number;
  saturated: number;
}
export interface Carbohydrates {
  total: number;
  sugar: number;
}
