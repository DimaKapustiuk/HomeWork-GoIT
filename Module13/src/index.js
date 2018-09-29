 import Model from "./js/model.js"
 import View from "./js/view.js"
 import Controller from "./js/controller.js"
 import "./style.scss"

 const model = new Model();
 const view = new View();
 const controller = new Controller(view, model);

 controller.init()
