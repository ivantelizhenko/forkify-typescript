import 'core-js/stable';
import 'regenerator-runtime/runtime';
import {
  SearchResultsFromAPI,
  RecipePreview,
  State,
  Recipe,
} from './utils/types';
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
  bookmarks: [],
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
    state.recipe.bookmarked = state.bookmarks.some(
      bookmark => bookmark.id === id
    );
  } catch (err) {
    console.error(`${err} ⛔️⛔️⛔️⛔️`);
    throw err;
  }
};

export const loadSearchResults = async function (query: string) {
  try {
    state.search.query = query;
    state.search.page = 1;
    const data = await getJSON(`${API_URL}?search=${query}`);

    state.search.results = data.data.recipes.map(
      (rec: SearchResultsFromAPI) => {
        const formatedRecipe: RecipePreview = {
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

export const updateServings = function (newServings: number) {
  const curRecipe = state.recipe as Recipe;

  curRecipe.ingredients.forEach(
    ing => (ing.quantity = (ing.quantity / curRecipe.servings) * newServings)
  );
  state.recipe.servings = newServings;
};

export const updateBookmark = function (recipe: RecipePreview) {
  // Add bookmark
  state.recipe.bookmarked
    ? (state.bookmarks = state.bookmarks.filter(
        el => el.id !== state.recipe.id
      ))
    : state.bookmarks.push(recipe);

  // Mark current recipe as bookmark
  if (recipe.id === state.recipe.id)
    state.recipe.bookmarked = !state.recipe.bookmarked;
};
