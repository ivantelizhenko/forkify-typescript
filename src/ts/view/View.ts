import { Data, PosibleRenderData } from '../utils/types';

export abstract class View {
  protected abstract data: Data<{}>;
  protected abstract parentElement: HTMLElement;
  protected abstract errorMessage: string;
  protected abstract message: string;

  protected abstract generateMarkup: () => string;

  render(data: Data<PosibleRenderData>) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this.data = data;
    const markup = this.generateMarkup();
    this.clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data: Data<PosibleRenderData>) {
    this.data = data;
    const newMarkup = this.generateMarkup();

    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDom.querySelectorAll('*'));
    const curElements = Array.from(this.parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      // Update changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue?.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      // Update changed ATTRIBUTES
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  protected clear() {
    this.parentElement.innerHTML = '';
  }

  renderSpinner(): void {
    const markup: string = `
          <div class="spinner">
            <svg>
              <use href="src/img/icons.svg#icon-loader"></use>
            </svg>
          </div>
  `;

    this.clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message: string = this.errorMessage) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="src/img/icons.svg#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;

    this.clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  renderMessage(message: string = this.message) {
    const markup = `
      <div class="message">
        <div>
          <svg>
          <use href="src/img/icons.svg#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;

    this.clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
