import './detail.module.css';

import axios from "axios";
import { useParams } from 'react-router-dom';///cjs/react-router-dom.min
import {useState, useEffect} from "react";

const Detail = () => {
  const {id} = useParams();
  const [recipe, setRecipe] = useState({});

  useEffect(()=>{
      axios(`http://localhost:3001/recipes/${id}`).then(({data}) => {
      if (data) {
        setRecipe(data);
      }else{
        window.alert("No hay recetas con ese ID");
      }
    });
  }, [id]);

  return (
    <div>
      <div>
        <h1>{recipe.name}</h1>
        <img src={recipe.image} alt="" />
        <h3>Summary</h3>
        <h4>{recipe.summary}</h4>
        <h3>Healt Score:</h3>
        <h4>{recipe.healtScore}</h4>
        <h3>Steps:</h3>
        {/* <h4>{recipe.steps}</h4> */}
        <h3>Diets:</h3>
        <h4>{recipe.diets}</h4>
      </div>
    </div>
  )
  
}

export default Detail;

