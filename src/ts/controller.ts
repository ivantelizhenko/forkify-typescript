import * as model from './model.ts';
import { Recipe } from './types.ts';
import recipeView from './view/recipeView.ts';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import searchView from './view/searchView.ts';
import resultView from './view/resultView.ts';

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
    resultView.render(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
}

const init = function () {
  recipeView.addHandlerRender(constrolRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
