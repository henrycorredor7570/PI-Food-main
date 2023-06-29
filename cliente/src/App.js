//DEPENDECIAS:
import { Route, Switch } from "react-router-dom";// para poder realizar mis rutas entre paginas
//IMPORTACIONES:
import Detail from "./views/Detail Page/detail.component";
import Form from "./views/Form Page/form.component";
import Home from "./views/Home Page/home.component";
import Landing from "./views/Landing Page/landing.component";

function App() {
  return (
    <Switch>
        <div>
          <Route exact path="/" component={Landing}></Route>
          <Route path="/home" component={Home}></Route>
          <Route path="/detail" component={Detail}></Route>
          <Route path="/form" component={Form}></Route>
      </div>
    </Switch>
  );
}

export default App;
