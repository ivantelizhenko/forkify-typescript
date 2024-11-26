import { Data, SearchResults } from '../types';
import { View } from './View';

class ResultsView extends View {
  protected declare data: Data<SearchResults>[];
  parentElement = document.querySelector('.results') as HTMLUListElement;
  errorMessage = 'No recipes found for your query. Pleasy try again!';
  message = '';

  declare render: (data: SearchResults[]) => void;

  generateMarkup = () => {
    return this.data.map(this.generateMarkupPreview).join('');
  };

  generateMarkupPreview(result: SearchResults) {
    return `
    <li class="preview">
      <a class="preview__link preview__link--active" href="#${result.id}">
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

export default new ResultsView();
