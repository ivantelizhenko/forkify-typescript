import { Data, SearchData } from '../utils/types';
import { View } from './View';

class PaginationView extends View {
  parentElement = document.querySelector('.pagination') as HTMLElement;
  protected declare data: Data<SearchData>;
  errorMessage = '';
  message = '';

  addHandlerClick(handler: Function) {
    this.parentElement.addEventListener('click', function (e) {
      const button = (e.target as HTMLButtonElement).closest(
        '.btn--inline'
      ) as HTMLButtonElement;

      if (!button) return;

      const goToPage = Number(button.dataset.goto);
      handler(goToPage);
    });
  }

  generateMarkup = () => {
    const numPage = Math.ceil(
      this.data.results.length / this.data.resultsPerPage
    );
    const curPage = this.data.page;

    // Page 1, and there are other pages
    if (curPage === 1 && numPage > 1) {
      return this.generateMarkupButton('next');
    }

    // Last page
    if (curPage === numPage && numPage > 1) {
      return this.generateMarkupButton('prev');
    }

    // Other page
    if (curPage < numPage) {
      return (
        this.generateMarkupButton('prev') + this.generateMarkupButton('next')
      );
    }

    // Page 1, and there are NO other pages
    return '';
  };

  generateMarkupButton(
    type: 'prev' | 'next',
    curPage: number = this.data.page
  ): string {
    const iconArrowLeft = `
      <svg class="search__icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
      </svg>

    `;
    const iconArrowRight = `
     
      <svg class="search__icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
      </svg>

    `;
    const definePage = type === 'prev' ? curPage - 1 : curPage + 1;

    const button = `
      <button data-goto="${definePage}" class="btn--inline pagination__btn--${type}">
        ${type === 'prev' ? iconArrowLeft : ''}
        <span>Page ${definePage}</span>
          ${type === 'next' ? iconArrowRight : ''}
      </button>
    `;

    return button;
  }
}

export default new PaginationView();
