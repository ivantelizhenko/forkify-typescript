import * as model from './model.ts';
import { AddRecipe, Recipe } from './utils/types.ts';
import recipeView from './view/recipeView.ts';
import searchView from './view/searchView.ts';
import resultView from './view/resultView.ts';
import paginationView from './view/paginationView.ts';
import addRecipeView from './view/addRecipeView.ts';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import bookmarksView from './view/bookmarksView.ts';
import { MODAL_CLOSE_SEC } from './utils/config.ts';

////////////////////////////////////////////////

async function controlRecipes(): Promise<void> {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // 0. Update results view to mark selected search results
    resultView.update(model.getSearchResultsPage());

    // 1. Loading recipe
    await model.loadRecipe(id);

    // 2. rendering recipe
    recipeView.render(model.state.recipe as Recipe);

    // Update bookmarks
    bookmarksView.update(model.state.bookmarks);
  } catch (err) {
    recipeView.renderError();
  }
}

async function controlSearchResults() {
  try {
    resultView.renderSpinner();

    // 1. Get search results
    const query = searchView.getQuery();
    if (!query) return;

    // 2. Load search results
    await model.loadSearchResults(query);

    // 3. Render results
    resultView.render(model.getSearchResultsPage());

    // 4. Render initial pagination
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
}

function controlPagination(goToPage: number) {
  // 1. Render new results
  resultView.render(model.getSearchResultsPage(goToPage));

  // 2. Render new initial pagination
  paginationView.render(model.state.search);
}

const controlServing = function (newServings: number) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);

  // Update the recipe view
  // recipeView.render(model.state.recipe as Recipe);
  recipeView.update(model.state.recipe as Recipe);
};

const controlUpdateBookmark = function () {
  // 1. Update bookmark status
  model.updateBookmark(model.state.recipe as Recipe);

  // 2. Update the recipe view
  recipeView.update(model.state.recipe as Recipe);

  // 3. Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe: AddRecipe) {
  try {
    // Show loading spinner
    addRecipeView.renderSpinner();

    // Upload the new recipe data
    await model.uploadRecipe(newRecipe);

    // Render recipe
    recipeView.render(model.state.recipe as Recipe);

    // Success message
    addRecipeView.renderMessage();

    // Render bookmark
    bookmarksView.render(model.state.bookmarks);

    // Change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // Close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);

    setTimeout(function () {
      addRecipeView.renderBack();
    }, MODAL_CLOSE_SEC * 2000);
  } catch (err) {
    console.error('⛔️⛔️⛔️⛔️', err);
    addRecipeView.renderError((err as Error).message);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServing);
  recipeView.addHandlerUpdateBookmark(controlUpdateBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  bookmarksView.addHandlerRender(controlBookmarks);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
