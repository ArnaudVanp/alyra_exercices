/*Jeu : Récupérer l'aire et le périmètre d'un cercle*/

/*Personnalisation de la page HTML standard*/
let title = document.getElementById("title");
let exoName = "exercice 1.1.4 -  Récupérer l'aire et le périmètre d'un cercle"; // indiquer ici le nom de l'exercice traité
title.innerHTML = exoName.toUpperCase();
let titre = document.getElementById("titre");
titre.innerHTML += exoName;


console.log("Voici l'",exoName);
/**************************************/

class Cercle { // class Cercle qui prend en paramètre le rayon du cercle et possèble deux méthodes
    constructor(rayon){
        this.rayon = parseInt(rayon);
    }

    aireCercle(){ // méthode de calcul de l'air du cercle qui utilise le paramètre rayon
        return 2 * Math.PI * this.rayon; 
    }

    perCercle(){ // méthode de calcul du périmètre du cercle qui utilise le paramètre rayon
        return Math.PI * this.rayon * this.rayon;
    }
};

let entree = window.prompt("Saisissez la valeur du rayon du cercle en centimètre : "); // Demande une saisie à l'utilisateur

const cercle = new Cercle(entree);

console.log("L'aire du cercle de rayon : "+entree+" cm est "+cercle.aireCercle()+" cm2");
console.log("Le périmètre du cercle de rayon "+entree+" cm est "+cercle.perCercle()+" cm");