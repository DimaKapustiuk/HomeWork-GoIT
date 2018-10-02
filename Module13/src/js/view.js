import bookmark from '../template/bookmark.hbs'

export default class View {
  constructor() {
    this._refs = {};

    this._refs.title = document.querySelector('.title')
    this._refs.input = document.querySelector('.input-user');
    this._refs.form = document.querySelector('.form');
    this._refs.bookmarks = document.querySelector('.bookmarks');
    this._refs.deleteBtn = document.querySelector('.delete-btn');
  }

  get refs() {
    return this._refs;
  }

  initItems(items) {
    const markup = items.reduce((string, item) => {
      return string + bookmark(item);
    }, '')

    this._refs.bookmarks.insertAdjacentHTML('beforeend', markup)
  }

  addItem(item) {
    const markup = bookmark(item);

    this._refs.bookmarks.insertAdjacentHTML('beforeend', markup)
  }

  removeItem(id) {
    const el = document.querySelector(`.bookmark-wrapper[data-id = "${id}"`);

    el.remove();
  }
}
