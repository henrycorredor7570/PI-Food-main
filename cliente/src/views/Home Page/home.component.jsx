//DEPENDENCIAS:
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

//Importaciones:
import { getRecipes, getRecipesByName } from '../../redux/actions';
import NavBar from '../../components/Navbar/navbar.component';
import Cards from '../../components/Cards/cards.component';
import './home.styles.css';

const Home = () => {
  const dispatch = useDispatch();// dispatch es la manera en que yo le envio una action al store
  const allRecipes = useSelector((state) => state.allRecipes);// con useSelector indico de que estado quiero estar pendiente, a cual estado esta suscrito
  
  const [searchName, setSearchName] = useState ("");

  const handleChange = (event) => { // funcion que setea el searchName, me lo setea a lo que sea el target value del input de busqueda
    event.preventDefault();//para que la pagina no se refresque, no se rerenderice
    setSearchName(event.target.value)
  };

  const handleSubmit = (event) =>{
    event.preventDefault();
    dispatch(getRecipesByName(searchName))
  }

  useEffect(()=>{
    dispatch(getRecipes())
  },[dispatch]);

  return (
    <div className='home'>
      <h2 className='home-title'>HOME</h2>
      <NavBar handleChange={handleChange} handleSubmit={handleSubmit}/>
      <Cards allRecipes={allRecipes}/>
    </div>
  );
}

export default Home;
