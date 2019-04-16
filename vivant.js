let solution = process.argv[2];
let guess = 50;
let essai = 1;
while (guess!= solution){
    guess = Math.floor(Math.random()*100+1);
    essai ++;
    console.log("guess", guess, "essai n", essai);
}
console.log(">>La réponse était ", solution, "trouvé en ",essai,"coups");
