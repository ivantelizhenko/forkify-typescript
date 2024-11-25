import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { Recipe } from './types';
import { API_URL } from './config';
import { getJSON } from './helpers';

interface State {
  recipe: Partial<Recipe>;
}

export const state: State = {
  recipe: {},
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
    console.error(`${(err as Error).message} ⛔️⛔️⛔️⛔️`);
  }
}
