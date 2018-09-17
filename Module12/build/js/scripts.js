"use strict";

(function () {
  var refs = selectRefs();

  function selectRefs() {
    var refs = {};
    refs.form = document.querySelector('.form');
    refs.input = document.querySelector('.input-user');
    refs.root = document.querySelector('.root');
    return refs;
  }

  var api = {
    baseUrl: 'http://api.linkpreview.net/?key=123456&q=https://www.google.com',
    getUrlImg: function getUrlImg() {
      return fetch(this.baseUrl).then(function (response) {
        if (response.ok) return response.json();
        throw new Error('Error in response');
      }).catch(function (error) {
        return alert(error);
      });
    }
  };
  api.getUrlImg().then(function (obj) {
    var markup = Handlebars.templates.card(obj);
    refs.root.insertAdjasentHTML('afterbegin', markup);
  });
})();