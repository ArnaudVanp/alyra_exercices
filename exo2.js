let solution = window.prompt("Faites moi devinez un entier entre 1 et 100:");
solution = parsInt(solution);

let entree = Math.floor(Math.random()*100+1);
console.log("L'ordinateur dit:",entree);

while (entree !== solution && solution != 0){
  console.log("L'ordinateur dit:",entree);
  let entree = Math.floor(Math.random()*100+1);
  }
  console.log("L’ordinateur a bien deviné :",entree);
