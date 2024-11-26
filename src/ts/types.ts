export type Data<T extends object> = T;

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

export interface SearchResultsFromAPI {
  id: string;
  title: string;
  publisher: string;
  image_url: string;
}

export interface SearchResults {
  id: string;
  title: string;
  publisher: string;
  image: string;
}

export type PosibleRenderData = Recipe | SearchResults[];
