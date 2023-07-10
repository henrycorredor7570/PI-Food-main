//configuracion inicial de redux:
//DEPENDENCIAS:
import { createStore, applyMiddleware, compose } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension"; // dependencia que nos ayuda a ver como se transforma el estado// y esta es por si no tengo el compose
import thunkMiddleware from "redux-thunk";
import rootReducer from "./reducer"; //importo mi archivo reducer.js
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //si tengo el compose de redux devtools instalado que sea ese o si no que sea el compose  que me traigo de redux

const store = createStore(
    rootReducer, 
    composeEnhancer(applyMiddleware(thunkMiddleware)));// primer parametro al reducer raiz, segundo parametro opciones extras 
// y thunk es un middleware que nos ayuda a trabajar con asincronia, por si solo redux no sabe trabajar asincronia

export default store;