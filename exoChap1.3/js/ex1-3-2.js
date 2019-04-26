/*Exercice 1-3-2 Trouver la frequence d'une lettre dans un texte */

function tableCaracteres(chaine){ // fonction qui va renvoyer une table de caractères

    let table = [];

    //Objet qui sera utilise pour stocker la fréquence de chaque entree dans la table
    class EntreeTable {
        constructor(entree,frequence){
            this.entree = entree;
            this.frequence = frequence;
        }
    }

    //fonction de recherche dans un tableau multidimension
    function rechercheTableMulti(tableau,recherche){
        for ( let i = 0; i < tableau.length; i++){
            if (tableau[i]["entree"] == recherche){
                return i;
            }
        } return false;
    }
    
    for( let i = 0; i < chaine.length; i++){

        let ouEstIl = rechercheTableMulti(table,chaine[i]);
       
        //verifier si le caractère n'existe pas dans la table
        if (!ouEstIl){
            //si il n'existe pas, créer l'objet (entree,frequence de 1), ajouter cet objet dans la table
            const nouvelleEntreeTable = new EntreeTable(chaine[i],1);
            table.push(nouvelleEntreeTable);

        } else {
            //si il existe dans la table, incrémenter de 1 la frequence de l'entree
            table[ouEstIl]["frequence"]++; 
        }
    } return table;
}

tableResultat = tableCaracteres(process.argv[2]);
console.table(tableResultat);

/*Methode condensée récursive qui évite la fonction recherche****************

function frequences(s) {
    lettres = {};
    for (let i in s) {
        if (lettres[s[i]] == undefined)
            lettres[s[i]] = 1;
        else
            lettres[s[i]]++;
    }
    return lettres;
}

console.log(frequences('Etre contesté, c’est être constaté'));
*/