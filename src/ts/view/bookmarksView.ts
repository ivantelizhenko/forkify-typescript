import { PreviewView } from './previewView';

class BookmarksView extends PreviewView {
  parentElement = document.querySelector(
    '.bookmarks__list'
  ) as HTMLUListElement;
  errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)';
  message = '';

  addHandlerRender(handler: () => void) {
    window.addEventListener('load', handler);
  }
}

export default new BookmarksView();
