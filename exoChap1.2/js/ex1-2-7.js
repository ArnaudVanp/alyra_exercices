/*Exercice: Exercice hashage*/

/*Personnalisation de la page HTML standard*/
let title = document.getElementById("title");
let exoName = "exercice 1.2.7 - Exercice hashage"; // indiquer ici le nom de l'exercice traité
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
  ["Washington DC","50.87.60.166"]
];

for( i = 0; i < listeServeurs.length; i++) {

cetteIp =  listeServeurs[i][1].split(".");
cetteVille = listeServeurs[i][0];

    let tempHash = SHA256(cetteIp+cetteVille);
    tempHash = tempHash.toString().slice(0, 8);
    listeServeurs[i].push(tempHash);
}

for( i = 0; i < listeServeurs.length; i++) {
    console.log("Le hash qui identifie le serveur situé dans la ville", listeServeurs[i][0], " est : ",listeServeurs[i][2]);
}
