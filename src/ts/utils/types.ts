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
  key?: string;
}

export interface RecipeFromAPI {
  id?: string;
  title: string;
  publisher: string;
  source_url: string;
  image_url: string;
  servings: number;
  cooking_time: number;
  ingredients: Ingredient[];
  key?: string;
}

export interface Ingredient {
  description: string;
  quantity: number | null;
  unit: string;
}

export interface SearchResultsFromAPI {
  id: string;
  title: string;
  publisher: string;
  image_url: string;
  key?: string;
}

export interface RecipePreview {
  id: string;
  title: string;
  publisher: string;
  image: string;
  key?: string;
}

export interface AddRecipe {
  [k: string]: string;
}

export type PosibleRenderData = Recipe | RecipePreview[] | SearchData;
export type PosibleForUpload = RecipeFromAPI;
