/*Exercice: Obtenir les meilleurs pourboires*/

/*Personnalisation de la page HTML standard*/
let title = document.getElementById("title");
let exoName = "exercice 1.2.2 - Obtenir les meilleurs pourboires"; // indiquer ici le nom de l'exercice traité
title.innerHTML = exoName.toUpperCase();
let titre = document.getElementById("titre");
titre.innerHTML += exoName;

console.log("Voici l'",exoName);
/**************************************/

let tableaux = [];
let blocs =  [];
let tempTransacsList = [];

class Transaction {  // classe qui permet de créer la liste des transactions(taille,valeur)
    constructor (id,taille,valeur){
        this.id = id;
        this.taille = taille;
        this.valeur = valeur;
    }
}

class Bloc { // classe qui créée un bloc standard qui stockera les transactions selon les critères de tri et de test.
    constructor (bId, bTaille, bValeur, bTransac){
        this.bId = bId;
        this.bTaille = bTaille;
        this.bValeur = bValeur;
        this.bTransac = bTransac;
    }
}


function tri_taille_croissant(a , b) {
    return a.taille > b.taille;
}
    
function tri_taille_decroissant(a , b) {
        return a.taille < b.taille;
}

function tri_blocs_valeurs_decroissant(a , b) {
    return a.bValeur < b.bValeur;
}



function ajouter_transac_a_une_liste (nomdelaliste, tailleInput,valeurInput,id_transac) {   
   if (id_transac == "" || !id_transac )
    { id_transac = nomdelaliste.length ; }

   nomdelaliste.push(new Transaction(id_transac ,tailleInput,valeurInput));   
}


function ajouter_bloc (blocTaille, blocValeur, blocTransac){
    blocId  = blocs.length ;
    blocs.push(new Bloc(blocId, blocTaille, blocValeur, blocTransac));
}



function demanderValeur () {
   
    let nouvelleEntree = prompt("Voulez-vous saisir une nouvelle transaction (O/N)?");

    if ( nouvelleEntree == "O" || nouvelleEntree == "o" ) {
        let newTransTaille = parseInt(prompt("Veuillez saisie la taille en octet de votre transaction"));
        let newTransValeur = parseInt(prompt("Veuillez saisir la valeur en Satoshis de votre transaction"));
        ajouter_transac_a_une_liste(tableaux,newTransTaille,newTransValeur);
        demanderValeur();
    } else if (nouvelleEntree == "N" || nouvelleEntree == "n" || !nouvelleEntree  ) {
        alert("Au revoir");}
        else {
        demanderValeur();
        }
};

ajouter_transac_a_une_liste(tableaux,2000,13000);
ajouter_transac_a_une_liste(tableaux,6000,9000);
ajouter_transac_a_une_liste(tableaux,800,2000);
ajouter_transac_a_une_liste(tableaux,700,1500);
ajouter_transac_a_une_liste(tableaux,1200,3500);
ajouter_transac_a_une_liste(tableaux,1000,2800);
ajouter_transac_a_une_liste(tableaux,1300,5000);
ajouter_transac_a_une_liste(tableaux,600,1500);
demanderValeur ();


tableaux.sort(tri_taille_decroissant);

let octets = 0; //compteur du max de la taille en octet - limite 6000.
let tips = 0; //compteur du gain en satoshis.

    for ( let i=0; i < tableaux.length; i++){

        taille_trans= tableaux[i].taille;
        valeur_trans=tableaux[i].valeur;
        id_trans =tableaux[i].id; 
        
        if (taille_trans > 6000) {
            console.log("La transaction "+ id_trans +" n'est pas une transaction valable (de taille supérieure à 6000 octets).");
        } 
  
        else if (taille_trans <= 6000 && octets < 6000 && taille_trans + octets <= 6000){
            
           
            octets += taille_trans;
            tips += valeur_trans;
            ajouter_transac_a_une_liste(tempTransacsList,taille_trans, valeur_trans, id_trans) ;

        }


        else {   // ok, une liste de transactions est prete pour remplir un bloc + on stocke la trans actuelle
            
            ajouter_bloc(octets,tips,tempTransacsList); 
            
            octets=taille_trans; 
            tips=valeur_trans;   
            tempTransacsList = []; 
        
            ajouter_transac_a_une_liste(tempTransacsList,taille_trans, valeur_trans, id_trans) ;
        }


    }  
   // on cree le bloc du restant des transactions valides par leur taille
   ajouter_bloc(octets,tips,tempTransacsList); 

  blocs.sort(tri_blocs_valeurs_decroissant);

   console.log("La meilleure combinaison possible de transactions rapporte : "+blocs[0].bValeur+" Satoshis et contient les transactions suivantes: ");

   console.table(blocs[0].bTransac);// affiche la table des transactions contenues dans le premier bloc.
