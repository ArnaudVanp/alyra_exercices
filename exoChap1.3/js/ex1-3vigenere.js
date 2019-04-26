/*Exercice Chiffrement de Vigenere */
/*Utiliser node en commande avec comme parametres <chaine à de/chiffrer> <clévigenere> <chif ou dechif>*/

function vigenere(str,cle,chifoudechif){

let alphabet = "abcdefghijklmnopqrstuvwxyz";

str = str.toString().replace(/ /g, '').toLowerCase(); // suppression des espaces et tout minuscule
cle = cle.toString().replace(/ /g, '').toLowerCase(); // suppression des espaces et tout minuscule
let tailleAB = alphabet.length;
let tailleCle = cle.length;
let tailleStr = str.length;

let posInit =0; let posNew = 0; 
let newStr = "";
let decalage=0;
let j=0;

for (let i = 0; i < tailleStr ; i++){  //on parcourt la chaine de characteres
  
  // j sert à ne pas depasser la taille de la cle
  if (j>=tailleCle) {j=0;}
  decalage = alphabet.search(cle.charAt(j));

  if (decalage==-1) {console.log("Clé invalide! Uniquement des lettres de l'alphabet");
  return false; }
  j++;
   
  //option dechif
  if (chifoudechif && chifoudechif== "dechif") decalage = -decalage;
  
  posInit = alphabet.search(str.charAt(i)); 

  // posDec: la position décalée dans l'alphabet
  let posDec = posInit + decalage;
  
  //le décalage ne déborde pas:
  if (posInit != -1 && posDec < tailleAB && posDec >= 0) {
    posNew = posDec;
    newStr += alphabet.charAt(posNew);
  }
  //le décalage 'déborde' (avant a ou après z)
  else if (posInit != -1 && posDec >= tailleAB || posDec < 0){
    
    // nouvelle position= modulo de la position décalée avec la taille de l'alphabet
    posNew  = posDec%tailleAB === 0 ? posInit : Math.abs(posDec%tailleAB);
    
    // cas particulier (lettre a,  et déchiffrement)
    if (posDec < 0) posNew =  tailleAB - posNew === 26 ? 0 : tailleAB - posNew ; 
    newStr += alphabet.charAt(posNew);
  }
  

  else {
    newStr += "?";
  }
    
  } return newStr;
}

let motTransmis= process.argv[2].toString();
let cleTransmise= process.argv[3].toString();
let ordreTransmis= process.argv[4] ? process.argv[4].toString() : "";
    

let motTranspose = vigenere(motTransmis,cleTransmise,ordreTransmis);
let prefixe = process.argv[4]=="dechif" ? "dé" : "";

if(motTranspose != false)
console.log("La chaine de caractere: '"+ motTransmis + "'  apres "+ prefixe+ "chiffrement avec la cle: '"+ cleTransmise + "' est: '"+ motTranspose+ "'. "  )
    