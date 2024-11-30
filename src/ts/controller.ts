import * as model from './model.ts';
import { Recipe } from './utils/types.ts';
import recipeView from './view/recipeView.ts';

import searchView from './view/searchView.ts';
import resultView from './view/resultView.ts';
import paginationView from './view/paginationView.ts';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

////////////////////////////////////////////////

async function constrolRecipes(): Promise<void> {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // 1. Loading recipe
    await model.loadRecipe(id);

    // 2. rendering recipe
    recipeView.render(model.state.recipe as Recipe);
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

const init = function () {
  recipeView.addHandlerRender(constrolRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
