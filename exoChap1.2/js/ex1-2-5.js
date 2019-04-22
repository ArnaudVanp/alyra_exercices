/*Exercice: Explorer un arbre*/

/*Personnalisation de la page HTML standard*/
let title = document.getElementById("title");
let exoName = "exercice 1.2.5 - Explorer un arbre"; // indiquer ici le nom de l'exercice traité
title.innerHTML = exoName.toUpperCase();
let titre = document.getElementById("titre");
titre.innerHTML += exoName;

console.log("Voici l'",exoName);
/**************************************/
function Noeud(valeur){
    this.valeur = valeur;
    this.left = null;
    this.right = null;
  }


  function ArbreBinaire() {
    this.root = null;
   }

 
ArbreBinaire.prototype.inserer = function(valeur){
    let noeud = new Noeud(valeur);
    if(!this.root) this.root = noeud;
    else{
       let current = this.root;
       while(!!current){
          if(noeud.valeur < current.valeur){
          if(!current.left){
              current.left = noeud;
              break;
            }
            current = current.left;
            } 
          else if(noeud.valeur > current.valeur){
            if(!current.right){
               current.right = noeud;
               break;
              }
             current = current.right;
             } 
           else {
             break; 
             }
            }
           }
       return this;
    };

    ArbreBinaire.prototype.contient = function(valeur){
        let current = this.root;
        while(current){
        if(valeur === current.valeur) return true;
        if(valeur < current.valeur) current = current.left;
        if(valeur > current.valeur) current = current.right;
        }
        return false;
       };

    let aB = new ArbreBinaire();
    let noeud = new Noeud(); 

aB.inserer(40).inserer(20).inserer(9).inserer(32).inserer(15).inserer(8).inserer(27);

console.log( "l'arbre contient il le chiffre 8 ? - " + aB.contient(8));

ArbreBinaire.prototype.parcourirInfixe = function(fn){
    let current = this.root;
    this._infixe(current, fn);
   };
   
ArbreBinaire.prototype._infixe = function(node, fn){
    if(!!node){
    this._infixe(node.left, fn);
    if(!!fn) fn(node);
    this._infixe(node.right, fn);
    }
   };
 

console.log ( "Valeurs de l'arbre selon l'ordre Infixe: ");
   aB.parcourirInfixe(function(node) {  console.log(node.valeur)} );


   ArbreBinaire.prototype.enleverNoeud = function(node, valeur){
    if(!node){
      return null;
    }
    if(valeur === node.valeur){ 
    
    // pas d'enfants
    if(!node.left && !node.right) return null; 
   
    // un seul enfant, à droite
    if(!node.left) node.right;
   
    // un seul enfant, à gauche
    if(!node.right) node.left;
    
    // deux enfants
    const temp = this.getMin(node.right);
    node.valeur = temp;
    node.right = this.enleverNoeud(node.right, temp);
    return node;
    } else if(valeur < node.valeur) {
        node.left = this.enleverNoeud(node.left, valeur);
        return node;
    } else  {
        node.right = this.enleverNoeud(node.right, valeur);
        return node;
      }
   };
   
   ArbreBinaire.prototype.retirer = function(valeur){
    this.root = this.enleverNoeud(this.root, valeur);
   };


   console.log ("Enlevons le noeud 27 - voici l'arbre résultant, selon l'ordre Infixe : " );
   aB.retirer(27);
   aB.parcourirInfixe(function(node) {  console.log(node.valeur)} );

