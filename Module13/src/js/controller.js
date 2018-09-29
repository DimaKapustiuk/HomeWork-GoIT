import logo from "../img/logo.png"

export default class Controller {
  constructor(view, model) {
    this._view = view;
    this._model = model;

    this._view._refs.form.addEventListener('submit', this.handleSubmitForm.bind(this));
    this._view._refs.bookmarks.addEventListener('click', this.handleDeleteBookmark.bind(this))

  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      const img = document.createElement('img');
      img.src = logo;
      const items = this._model._items;

      this._model.clearStorage()

      this._view._refs.title.appendChild(img);
      this._view.initItems(items);
    });
  }

  handleSubmitForm(event) {
    event.preventDefault();

    const userUrl = this._view._refs.input.value;

    this._model.getUrl(userUrl)
      .then(data => {
        if (data === undefined) return;

        this._view.addItem(data);
      });

    this._view._refs.form.reset();
  }

  handleDeleteBookmark({ target }) {
    if (target.nodeName !== 'BUTTON') return;

    const parentBookmark = target.closest('.bookmark-wrapper');
    const bookmarkId = Number(parentBookmark.dataset.id);

    this._model.delete(bookmarkId);
    this._view.removeItem(bookmarkId);
  }
}
