//DEPENDECIAS:
import { Route } from "react-router-dom";// para poder realizar mis rutas entre paginas
//IMPORTACIONES:
import { Landing, Home, Form, Detail } from "./views";
import NavBar from "./components/Navbar/navbar.component";
import { useLocation } from "react-router-dom/cjs/react-router-dom";

function App() {

  const location = useLocation();
  return (
        <div>
          {location.pathname !== "/" && <NavBar/>} {/* si location .pathname es diferente de / renderizo NavBar */}
          {/* mejor manera de definir rutas con render para poder trabajar con props */}
          <Route exact path="/" render={()=> <Landing/>}/>
          <Route path="/home" render={()=> <Home/>}/>
          <Route path="/detail" render={()=> <Detail/>}/>
          <Route path="/form" render={()=> <Form/>}/>
      </div>
  );
}

export default App;
