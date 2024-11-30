export interface State {
  recipe: Partial<Recipe>;
  search: SearchData;
}

export interface SearchData {
  query: string;
  results: SearchResults[];
  page: number;
  resultsPerPage: number;
}

export type Data<T extends object> = T;

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

export interface Ingredient {
  description: string;
  quantity: number;
  unit: string;
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

export type PosibleRenderData = Recipe | SearchResults[] | SearchData;
