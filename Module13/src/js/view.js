import bookmark from '../template/bookmark.hbs'
import inputError from '../template/inputError.hbs'
import errorResponse from '../template/errorResponse.hbs'

export default class View {
  constructor() {
    this._refs = {};

    this._refs.title = document.querySelector('.title');
    this._refs.container = document.querySelector('.container')
    this._refs.input = document.querySelector('.input-user');
    this._refs.form = document.querySelector('.form');
    this._refs.bookmarks = document.querySelector('.bookmarks');
    this._refs.deleteBtn = document.querySelector('.delete-btn');
    this._refs.backdrop = document.querySelector('.backdrop');
  }

  get refs() {
    return this._refs;
  }

  initInputError() {
    const error = inputError();

    this._refs.form.insertAdjacentHTML('beforeend', error)
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

   testUserInput(value, target){
    const httpRegExp = new RegExp("^(http://|https://)");
    const testHttp = httpRegExp.test(value);
  
    if(testHttp) {
      target.style.border = '2px solid green';
      this.removeError(this._refs.form,'error');
    } else {
        target.style.border = '2px solid red';
        this.displayError(this._refs.form,'error');
      }
  }

  displayResponseError(error) {
    const errorResp = errorResponse(error);
    this._refs.backdrop.innerHTML = errorResp;

    this.displayError(this._refs.container, 'error')
  }
  
  displayError(elem, cls) {
    elem.classList.add(cls);
  }

  removeError(elem, cls){
    elem.classList.remove(cls);
  }
}
