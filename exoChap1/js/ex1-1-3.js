/*Jeu : Réaliser un vérificateur de palimdrome*/

/*Personnalisation de la page HTML standard*/
let title = document.getElementById("title");
let exoName = "exercice 1.1.3 - Réaliser un vérificateur de palimdrome"; // indiquer ici le nom de l'exercice traité
title.innerHTML = exoName.toUpperCase();
let titre = document.getElementById("titre");
titre.innerHTML += exoName;


console.log("Voici l'",exoName);
/**************************************/
/*var program = require("commander") 
program
.version("1.0.0")
.parse(process.argv)*/

let mot = "";

mot = window.prompt("S'agit-il d'un palindrome ? Saisissez un mot: "); // Demande une saisie à l'utilisateur
console.log(mot);

function palindrome(mot) {
    if (( mot.length == 0 ) || (mot.length == 1)) 
        return true;
    else if (mot[0] == mot[mot.length-1])
        return palindrome(mot.substring(1,mot.length-1)); //compare paire de lettre de l'exterieur vers l'interieur des extrémité
    else 
        return false;
    }
    
function estPalindrome(chaine) {
    //let reponse = (chaine, palindrome(chaine.split(" ").join(""))?"est":"n'est pas","un palindrome");
    let reponse = palindrome(chaine) ? " est un palindrome" : " n'est pas un palindrome";
    reponse = chaine + reponse; 
    console.log(reponse);
    return reponse;
    }
    
//estPalindrome(process.argv[2]);

estPalindrome(mot);
resultat.innerHTML = estPalindrome(mot); // affiche le résultat en page HTML

