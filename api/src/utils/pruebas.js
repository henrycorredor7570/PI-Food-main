/* const response = [{diets: ["dairi","gluten","whole"], vegan: true},{diets: ["dairi","pescar","foodmap"], vegan: true},{diets: ["keturi","dairi","michis"], vegan: true}]

const dietsSet = new Set(); 

console.log(dietsSet);

response.forEach((diet) => {
  diet.diets.forEach((d) => dietsSet.add(d));
});
console.log(dietsSet);

const uniqueDiets = Array.from(dietsSet);

console.log(uniqueDiets); */