//DEPENDECIAS:
import { Route } from "react-router-dom";// para poder realizar mis rutas entre paginas
//IMPORTACIONES:
import { Landing, Home, Form, Detail } from "./views";

function App() {
  return (
        <div>
          <Route exact path="/" render={()=> <Landing/>}/>
          <Route path="/home" render={()=> <Home/>}/>
          <Route path="/detail/:id" render={()=> <Detail/>}/>
          <Route path="/form" render={()=> <Form/>}/>
      </div>
  );  
}

export default App;
