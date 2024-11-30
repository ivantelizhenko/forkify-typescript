import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { SearchResultsFromAPI, SearchResults, State } from './utils/types';
import { API_URL, RES_PER_PAGE } from './utils/config';
import { getJSON } from './utils/helpers';

export const state: State = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
};

export const loadRecipe = async function (id: string): Promise<void> {
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
};

export const loadSearchResults = async function (query: string) {
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
};

export const getSearchResultsPage = function (
  page: number = state.search.page
) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};
