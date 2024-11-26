class SearchView {
  private parentElement = document.querySelector('.search') as HTMLFormElement;

  getQuery() {
    return (
      this.parentElement.querySelector('.search__field') as HTMLInputElement
    ).value;
  }

  private clearInput() {
    (
      this.parentElement.querySelector('.search__field') as HTMLInputElement
    ).value = '';
  }

  addHandlerSearch(handler: Function): void {
    this.parentElement.addEventListener('submit', e => {
      e.preventDefault();
      handler();
      this.clearInput();
    });
  }
}

export default new SearchView();
