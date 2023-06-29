const validation = (input) => {// recibe por parametro el estado
    const errors = {}; // si alguna de las validaciones de abajo da true se crea en este objeto la validacion correspondiente

    if(!input.name) errors.name = "debe diligenciar este campo"
    if(!/^[^0-9]*$/.test(input.name)) errors.name = "nombre inválido";
    if(input.summary.length < 30) errors.summary = "tiene que tener minimo 30 caracteres"
    if(input.healtScore < 1 || input.healtScore > 100) errors.healtScore = "debe tener un valor entre 1 y 100"
    if(!input.step.length) errors.step = "debe diligenciar este campo"
    
    return errors;
  }

export default validation;