/*Exercice: Etablir une table de hashage*/

/*Personnalisation de la page HTML standard*/
let title = document.getElementById("title");
let exoName = "exercice 1.2.7 - Etablir une table de hashage"; // indiquer ici le nom de l'exercice traité
title.innerHTML = exoName.toUpperCase();
let titre = document.getElementById("titre");
titre.innerHTML += exoName;

console.log("Voici l'",exoName);
/**************************************/
let listeServeurs = [
["Amsterdam","153.8.223.72"],
["Chennai","169.38.84.49"],
["Dallas","169.46.49.112"],
["Dallas, TX, USA", "184.173.213.155"],
["Frankfurt","184.173.213.155"],
["Hong Kong ","119.81.134.212"],
["London","5.10.5.200"],
["London","158.176.81.249"],
["Melbourne","168.1.168.251"],
["Mexico City", "169.57.7.230"],
["Milan","159.122.142.111"],
["Paris","159.8.78.42" ],
["San Jose","192.155.217.197"],
["São Paulo","169.57.163.228"],
["Toronto","169.56.184.72"],
["Washington DC","50.87.60.166"]];

// console.table(listeServeurs);
function hachage(chaine) {
 condensat=0;
 for (i=0; i< chaine.length;i++){
   condensat = (condensat + chaine.charCodeAt(i) * 3** i) % 65536;
 }
 return condensat;
}

let ip1= toString(listeServeurs[1][1]);
console.log(ip1);




//console.table(listeServeurs);