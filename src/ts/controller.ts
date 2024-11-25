import * as model from './model.ts';
import { Recipe } from './types.ts';
import recipeView from './view/recipeView.ts';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

////////////////////////////////////////////////

async function showRecipe(): Promise<void> {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // 1. Loading recipe
    await model.loadRecipe(id);

    // 2. rendering recipe
    recipeView.render(model.state.recipe as Recipe);
  } catch (err) {
    console.error(`${(err as Error).message}`);
  }
}

// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe);

const init = function () {
  recipeView.addHandlerRender(showRecipe);
};
init();
