import * as api from "./services/api.js"
import { LOCALSTORAGE } from "./services/localStorage.js"
import defaultImage from "../img/catalog-default-img.gif"

export default class Model {
  constructor() {
    this._dataStorage = this.getAllItems();
    this._items = this._dataStorage ? this._dataStorage : [];
  }

  get items() {
    return this._items;
  }

  // set items(items) {
  //   return this._items = items;
  // }

  getUrl(url) {
    return api.getUrl(url)
      .then(data => {
        if (data === undefined) return;

        if (data.image === "") {
          data.image = defaultImage;
        }

        data.id = Date.now();

        data.date = this.formatTime(data.id);

        this._items.push(data);
        LOCALSTORAGE.set("items", this._items)

        return data;
      });
  }

  getAllItems() {
    return LOCALSTORAGE.get('items');
  }

  delete(id) {
    const allItems = this.getAllItems();
    const filterItems = allItems.filter(obj => obj.id !== id);

    this._items = filterItems;

    LOCALSTORAGE.set("items", filterItems);
  }

  clearStorage() {
    LOCALSTORAGE.clear();
  }

  formatTime(ms) {
    const date = new Date(ms);

    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };

    return date.toLocaleString('Uk-uk', options);
  }
}
