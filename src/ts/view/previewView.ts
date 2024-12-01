import { Data, RecipePreview } from '../utils/types';
import { View } from './View';

export abstract class PreviewView extends View {
  protected declare data: Data<RecipePreview>[];
  declare parentElement: HTMLUListElement;

  declare render: (data: RecipePreview[]) => void;

  generateMarkup = () => {
    return this.data.map(this.generateMarkupPreview).join('');
  };

  generateMarkupPreview(result: RecipePreview) {
    const id = window.location.hash.slice(1);

    return `
    <li class="preview">
      <a class="preview__link ${
        result.id === id ? 'preview__link--active' : ''
      }" href="#${result.id}">
        <figure class="preview__fig">
          <img src=${result.image} alt="${result.title}" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${result.title} ...</h4>
          <p class="preview__publisher">${result.publisher}</p>
        </div>
      </a>
    </li>
    `;
  }
}
