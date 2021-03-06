import logo from "../img/logo.png"

export default class Controller {
  constructor(view, model) {
    this._view = view;
    this._model = model;

    this._view.refs.form.addEventListener('submit', this.handleSubmitForm.bind(this));
    this._view.refs.bookmarks.addEventListener('click', this.handleDeleteBookmark.bind(this));
    this._view.refs.input.addEventListener('input', this.handleInputValue.bind(this));
    this._view.refs.backdrop.addEventListener('click', this.handleCloseModalError.bind(this));
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      const img = document.createElement('img');
      img.src = logo;

      const items = this._model.items;

      // this._model.clearStorage()
      this._view.initInputError();
      this._view.refs.title.appendChild(img);
      this._view.initItems(items);
    });
  }

  handleSubmitForm(event) {
    event.preventDefault();

    const userUrl = this._view.refs.input.value;

    this._model.getUrl(userUrl)
      .then(data => {
        if (data === undefined) return;

        this._view.addItem(data);
      })
      .catch(error => {
        this._view.displayResponseError({error})
        window.addEventListener('keydown', this.handleCloseModalError.bind(this));
    });

    this._view.refs.form.reset();
  }

  handleCloseModalError(event) {
     const target = event.target;
     const code = event.code;
     const action = target.dataset.action;

     if(code === 'Escape' || action === 'modal-close') { 
       this._view.removeError(this._view.refs.container, 'error')
     }
      window.removeEventListener('keydown', this.handleCloseModalError.bind(this));

      console.log(window)
  }

  handleDeleteBookmark({ target }) {
    if (target.nodeName !== 'BUTTON') return;

    const parentBookmark = target.closest('.bookmark-wrapper');
    const bookmarkId = Number(parentBookmark.dataset.id);

    this._model.delete(bookmarkId);
    this._view.removeItem(bookmarkId);
  }

  handleInputValue({target}) {
    let value = target.value;
    this._view.testUserInput(value, target);
}
}
