/*Jeu : Calculer le factoriel d'un nombre*/

/*Personnalisation de la page HTML standard*/
let title = document.getElementById("title");
let exoName = "exercice 1.2.1 - Calculer le factoriel d'un nombre"; // indiquer ici le nom de l'exercice traité
title.innerHTML = exoName.toUpperCase();
let titre = document.getElementById("titre");
titre.innerHTML += exoName;


console.log("Voici l'",exoName);
/**************************************/

let a = prompt("Entrez un entier naturel positif");
 
function factoriel(n) {
    if(n === 0) {
        return 1;
    } else {
        res = 1;
        for(i = 2; i <= n; i++) {
            res *= i;
        }
        return res;
    }
}
console.log("!= "+a+" est "+factoriel(a)+", il est calculé en "+(i-1)+" itérations de manière itérative.");

/*Calcul factorielle de manière récursive */
j=0;
function factorielRecurs(a) {
    j++;
    if(a === 0) {
        return 1;
    } else {
        return a * factorielRecurs(a-1);
    }
};


console.log("!= "+a+" est "+factorielRecurs(a)+", il est calculé en "+(j-1)+" itérations de manière récursive.");
