import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { SearchResultsFromAPI, Recipe, SearchResults } from './types';
import { API_URL } from './config';
import { getJSON } from './helpers';

interface State {
  recipe: Partial<Recipe>;
  search: {
    query: string;
    results: SearchResults[];
  };
}

export const state: State = {
  recipe: {},
  search: {
    query: '',
    results: [],
  },
};

export async function loadRecipe(id: string): Promise<void> {
  try {
    const data = await getJSON(`${API_URL}${id}`);

    const recipe = data.data.recipe;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (err) {
    console.error(`${err} ⛔️⛔️⛔️⛔️`);
    throw err;
  }
}

export async function loadSearchResults(query: string) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);

    state.search.results = data.data.recipes.map(
      (rec: SearchResultsFromAPI) => {
        const formatedRecipe: SearchResults = {
          id: rec.id,
          title: rec.title,
          publisher: rec.publisher,
          image: rec.image_url,
        };
        return formatedRecipe;
      }
    );
  } catch (err) {
    console.error(`${err} ⛔️⛔️⛔️⛔️`);
    throw err;
  }
}
