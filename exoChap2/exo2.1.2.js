/*Exercice 2.1.2 Identifier le niveau de difficulté d'un bloc*/

function convertirBits(bits){
    let longueurChaine = parseInt(bits.substring(0,2),16);  //un nombre 
    let debutChaine = bits.substring(2,8);  //6 caracteres
    let contenuChaine = debutChaine+"0".repeat(longueurChaine*2-6); // 6 caracteres + des zeros --> jusqu'à 64
    let resultat = "0".repeat(64-(longueurChaine*2))+contenuChaine;
    return resultat;
}

//Calcul de la cible à partir de la valeur de Bits de difficulté:

function calculCible(bits){
    cible = parseInt(convertirBits(bits),16);
    //equivalent à:
    //let coefficient = parseInt(bits.substring(2,8),16);
    //let exposant = parseInt(bits.substring(0,2),16);
    //let cible = coefficient * ( 2 ** (parseInt('08',16)*(exposant-parseInt('03',16))));
    return cible;
}

//Calcul de la difficulté (reciblage)
function calculDifficulte(bits){
    let difficulte= calculCible('1d00ffff')/calculCible(bits);
    return difficulte;
}

console.log("Conversion de la valeur cible de difficulté :\n"+convertirBits('207fffff'));
console.log("Valeur décimale de la cible de difficulté : "+calculCible('207fffff'));
console.log("Valeur de la difficulté : "+calculDifficulte('207fffff'));