//DEPENDECIAS:
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider} from "react-redux";// sirve para proveer a toda mi aplicacion del estado que se crea dentro del store
import { BrowserRouter } from 'react-router-dom';
//IMPORTACIONES:
import { store } from "./redux/store";//una vez creamos la store generamos la conexion con react por eso importamos la store
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
