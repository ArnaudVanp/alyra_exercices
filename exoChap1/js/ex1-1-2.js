/*Jeu : Trouver un nombre saisi par l'utilisateur efficacement*/

/*Personnalisation de la page HTML standard*/
let title = document.getElementById("title");
let exoName = "exercice 1.1.2 - Trouver un nombre saisi par l'utilisateur efficacement"; // indiquer ici le nom de l'exercice traité
title.innerHTML = exoName.toUpperCase();
let titre = document.getElementById("titre");
titre.innerHTML += exoName;


console.log("Voici l'",exoName);
/**************************************/

let proceed = true;
let i = 0;//initialise le nombre de tentatives

function sol(message){
    if (message == "conforme"){
    solution = parseInt(window.prompt("Choisissez un nombre entier entre 1 et 100 que l'ordinateur doit deviner ;-)")); // Demande une saisie à l'utilisateur
    } else if (message == "nonconforme")
    {
    solution = parseInt(window.prompt("Valeur impossible elle doit être entre 1 et 100 !)")); 
    }
    console.log("L'ordinateur doit deviner",solution);
    return solution;
}

function devine(){
    let devine = Math.floor(Math.random() * 100 + 1); //stocke dans solution un nombre aléatoire entier entre 1 et 100 différent de zero arrondi à l'inférieur

    while (devine != solution && solution != 0 && i<5000){
    devine = Math.floor(Math.random()*100+1); 
    console.log("L'ordinateur dit:",devine,"au coup #",i);
    i++;
    } 
    console.log("L’ordinateur a bien deviné :",devine,"en",i-1,"coups");
    resultat.innerHTML = "L’ordinateur a bien deviné :"+ devine; // affiche le résultat en page HTML
    i = 0;
    return devine;
}

while (proceed) {
    
    sol("conforme");

    if (solution >= 1 && solution <= 100){
        devine();
    }
    
    
    else if (solution < 1 || solution > 100){
        console.log("solution impossible");
        console.log(solution);
        resultat.innerHTML = 'Solution impossible: '+ "<b>" + solution + "</b>"; // affiche le résultat en page HTML
        sol("nonconforme"); 
        devine();
        proceed = false;
        }
    
    else {
        console.log("Au revoir");
        resultat.innerHTML = 'Au revoir !'; // affiche le résultat en page HTML
        proceed = false; 
    }
}