//configuracion inicial de redux:
//DEPENDENCIAS:
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension"; // dependencia que nos ayuda a ver como se transforma el estado
import thunk from "redux-thunk";

import rootReducer from "./reducer"; //importo mi archivo reducer.js

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));// primer parametro al reducer raiz, segundo parametro opciones extras 
// y thunk es un middleware que nos ayuda a trabajar con asincronia, por si solo redux no sabe trabajar asincronia
