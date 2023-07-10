import { useState } from "react";
import './form.module.css';
import validation from "../../Utils/validation"

const Create = () => {
  //creo un solo estado para todos los inputs
  const [input, setInput] = useState({
     /* atributos tienen que coincidir como se tienen en la base de datos */
    name:"",
    summary:"",
    healtScore:"",
    steps:"",
    image:"",
    nameDiet:[],
  });

  const [errors, setErrors] = useState({
    name:"",
    summary:"",
    healtScore:"",
    steps:"",
    image:"",
    nameDiet:[],
  });
  
  const handleOnChange = (event) => {
    setInput({
      ...input,
      [event.target.name]:event.target.value//event.target.name se relaciona con el name de cada etiqueta input
    })
    
    setErrors(validation({//llamo a validate para que las validaciones se hagan en tiempo real y no cuando termine de llenar el form
      ...input, //le paso todo el objeto a validar
      [event.target.name]:event.target.value
    }));
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();     
  }

  return (
    <div>
      <form onSubmit={handleOnSubmit}>{/* este evento es de la etiqueta form pero se ejecuta cuando le de click al boton send */}
        <h1>CREATE RECIPE</h1>

        <label htmlFor="name">Name: </label>{/* htmlFor es para asociarlo al input  */}
        <input name ="name" type="text" placeholder='recipe name...'  value={input.name} onChange={handleOnChange}/>
        {errors.name && <p style={{color:"red"}}>{errors.name}</p>}{/* si hay algo en errors.email muestreme eso en mi etiqueta p; caso contrario string vacio*/}
        <hr />
        <label htmlFor="summary">Summary: </label>
        <input name ="summary" type="text" placeholder='sumary...' value={input.summary} onChange={handleOnChange}/>
        {errors.summary && <p style={{color:"red"}}>{errors.summary}</p>}
        <hr />
        <label htmlFor="healtScore">Healt Score: </label>
        <input name ="healtScore" type="number" value={input.healtScore} onChange={handleOnChange}/>
        {errors.healtScore && <p style={{color:"red"}}>{errors.healtScore}</p>}
        <hr />
        <label htmlFor="steps">Steps: </label>
        <input name ="steps" type="text" placeholder='Step by Step...' value={input.steps} onChange={handleOnChange}/>
        {errors.steps && <p style={{color:"red"}}>{errors.steps}</p>}
        <hr />
        <label htmlFor="image">Image: </label>
        <input name ="image" type="" value={input.image} onChange={handleOnChange}/>
        <hr />
        <label htmlFor="nameDiet">Diets: </label>
        <input name ="nameDiet" type="" value={input.nameDiet} onChange={handleOnChange}/>
        <hr />
        <button disabled={!input.name || !input.summary || !input.healtScore || !input.steps || !input.image || !input.nameDiet 
                       || errors.name || errors.summary || errors.healtScore || errors.steps || errors.image || errors.nameDiet}>Send</button>

      </form>
    </div>
    
  );
}

export default Create;
