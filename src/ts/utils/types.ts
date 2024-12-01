export interface State {
  recipe: Partial<Recipe>;
  search: SearchData;
  bookmarks: RecipePreview[];
}

export interface SearchData {
  query: string;
  results: RecipePreview[];
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
  bookmarked: boolean;
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

export interface RecipePreview {
  id: string;
  title: string;
  publisher: string;
  image: string;
}

export type PosibleRenderData = Recipe | RecipePreview[] | SearchData;
