/*Jeu : Trouver un nombre aléatoire*/

/*Personnalisation de la page HTML standard*/
let title = document.getElementById("title");
let exoName = "exercice 1.1.1 - Trouver un nombre aléatoire"; // indiquer ici le nom de l'exercice traité
title.innerHTML = exoName.toUpperCase();
let titre = document.getElementById("titre");
titre.innerHTML += exoName;


console.log("Voici l'",exoName);
/**************************************/


let solution = Math.floor(Math.random() * 100 + 1); //stocke dans solution un nombre aléatoire entier <=100 différent de zero arrondi à l'inférieur
console.log(solution); // affiche la solution en console pour faciliter la résolution

let entree = window.prompt("Devinez un nombre entre 1 et 100"); // Demande une saisie à l'utilisateur
console.log(entree);

if (entree != null && entree != 0) { // test la valeur null pour quitter avec cancel 
    do { //do while permet de tester les différents cas de figure tant que les conditions de sorties ne sont pas remplies
        if(entree != solution && entree < 100) {
            entree = window.prompt( entree + " est la mauvaise réponse - vous pouvez réessayer:");
            console.log(entree); 
        } else if (entree != solution && entree > 100) {
            entree = window.prompt( entree + " est impossible car supérieur à 100 - vous pouvez réessayer:");
            console.log(entree); 
        } else {
            let bravo = "Bravo vous avez trouvez la bonne réponse ! ";
            console.log(bravo,solution);
            resultat.innerHTML = bravo + '<b>'+ solution +'</b>'; // affiche le résultat en page HTML
            alert(bravo + solution + ' !');
            break;    
        }  
    } while (entree != 0 && entree != null);
}