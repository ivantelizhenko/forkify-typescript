import 'core-js/stable';
import 'regenerator-runtime/runtime';
import {
  SearchResultsFromAPI,
  RecipePreview,
  State,
  Recipe,
  AddRecipe,
} from './utils/types';
import { API_URL, KEY, RES_PER_PAGE } from './utils/config';
import { AJAX } from './utils/helpers';

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

const createRecipeObject = function (data: any) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const loadRecipe = async function (id: string): Promise<void> {
  try {
    const data = await AJAX(`${API_URL}${id}?key=${KEY}`, 'GET');

    state.recipe = createRecipeObject(data);
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
    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`, 'GET');

    state.search.results = data.data.recipes.map(
      (rec: SearchResultsFromAPI) => {
        const formatedRecipe: RecipePreview = {
          id: rec.id,
          title: rec.title,
          publisher: rec.publisher,
          image: rec.image_url,
          ...(rec.key && { key: rec.key }),
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
    ing =>
      (ing.quantity = ing.quantity
        ? (ing.quantity / curRecipe.servings) * newServings
        : null)
  );
  state.recipe.servings = newServings;
};

export const updateBookmark = function (recipe: Recipe) {
  // Add/delete bookmark
  state.recipe.bookmarked
    ? (state.bookmarks = state.bookmarks.filter(
        el => el.id !== state.recipe.id
      ))
    : state.bookmarks.push(recipe);

  // Toggle bookmarked
  if (recipe.id === state.recipe.id)
    state.recipe.bookmarked = !state.recipe.bookmarked;

  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();

export const uploadRecipe = async function (newRecipe: AddRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(
        entry => entry[0].startsWith('ingredient') && entry[1].trim() !== ''
      )
      .map(ing => {
        const ingArr = ing[1].replaceAll(' ', '').split(',');
        if (ingArr.length !== 3)
          throw new Error(
            'Wrong ingredient format. Please use the correct format :)'
          );
        const [quantity, unit, description] = ingArr;

        return { description, quantity: quantity ? +quantity : null, unit };
      });

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      publisher: newRecipe.publisher,
      image_url: newRecipe.image,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };

    const data = await AJAX(`${API_URL}?key=${KEY}`, 'POST', recipe);
    state.recipe = createRecipeObject(data);
    updateBookmark(state.recipe as Recipe);
  } catch (err) {
    throw err;
  }
};
