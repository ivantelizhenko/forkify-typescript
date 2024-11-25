export interface Ingredient {
  description: string;
  quantity: number;
  unit: string;
}

export interface Recipe {
  id: string;
  title: string;
  publisher: string;
  sourceUrl: string;
  image: string;
  servings: number;
  cookingTime: number;
  ingredients: Ingredient[];
}

export interface StartedData {}

export type Data<T extends object> = T;

export interface AnyPosibleData {
  id: string;
  title: string;
  publisher: string;
  sourceUrl: string;
  image: string;
  servings: number;
  cookingTime: number;
  ingredients: Ingredient[];
}
