const program = require('commander');
const sha256 = require('crypto-js/sha256');

program
.version('1.0.0')
.arguments('<data...>')
.option("-p, --preuve <index>")
.action(function(data){

let arbreMerkle = creerArbreMerkle(data);

function creerArbreMerkle(donneesEntree){
    
    let taille = donneesEntree.length;
    let indice = 0;
    let tableArbre = [];   

    for (i in donneesEntree){ // Ajoute à la tableArbre les consensats des données (en sha256)
        tableArbre[i] = sha256(donneesEntree[i]).toString();
    } 

        
    // Remplir l'arbre de chaines vides si ce n'est pas une puissance de 2
    if (!Number.isInteger( Math.log2(taille))){
        let closestPower = 2**Math.ceil(Math.log2(taille))
        for (let i = taille; i < closestPower; i++) {   
            tableArbre.push("")
        }
        taille = tableArbre.length;
        //console.log("Taille corrigée:", tableArbre.length);
    } 

    while (taille > 1){
    // On complete les niveaux supérieur de l'arbre faisant le condensat des concaténations deux par deux.
        for (let i = indice; i < indice+taille; i=i+2) {
        tableArbre.push(sha256(tableArbre[i]+tableArbre[i+1]).toString())
        }
    //avancer de la largeur de la profondeur actuelle et diviser par 2 cette profondeur
        indice = indice + taille
        taille = taille/2
    }
    
    return tableArbre;
}




console.log("\nPour les entrées:",data,"\n Voici l'Arbre de Merkle:");
console.log(arbreMerkle);

console.log("Voici la racine de l'arbre de Merkle créé :",arbreMerkle[arbreMerkle.length-1]);


if (program.preuve){
    let frere;
   
    function rechercheFrere(hashRecherche){
        for (let i in arbreMerkle){
                
            if (arbreMerkle[i] == hashRecherche){
                
                if( i%2 == 0){  //console.log(i + " est pair!"); 
                 let indice= i++ +1;
                  frere = arbreMerkle[indice];
                }
                else { // console.log(i + " impair!");
                let indice= i-1;
                frere = arbreMerkle[indice];
                }
            }
            
           

            

        } 

        if(frere!="") return frere;
        else return false;        } 

    function rechercheOncle(hashPreuve){
        let frere = rechercheFrere(hashPreuve);
        let posPreuve= arbreMerkle.indexOf(hashPreuve);
        let pere;
       if (posPreuve%2 == 0)
       { pere = sha256(hashPreuve+frere).toString(); }

       else 
       { pere = sha256(frere+hashPreuve).toString(); }
      
       let oncle = rechercheFrere(pere);
       return oncle;
    };

    function affichConfirm(hashPreuve) {
        let frere=rechercheFrere(hashPreuve);
        let posPreuve= arbreMerkle.indexOf(hashPreuve);
        let hashPere;
        let compar;
    
        
        if (posPreuve%2 == 0) {
         hashPere = sha256(hashPreuve+frere).toString(); }
        else {
         hashPere = sha256(frere+hashPreuve).toString();
        }      
        
        let oncle = rechercheOncle(hashPreuve);

         let posOncle= arbreMerkle.indexOf(oncle);
        
           if (posOncle%2 == 0) 
              {    
                   compar = sha256(oncle+hashPere).toString(); }
           else 
              { compar = sha256(hashPere+oncle).toString(); }
        
        let racine = arbreMerkle[arbreMerkle.length-1];

        if (compar == racine) console.log(" le resultat du hashage :"+compar+ "  \n est bien egal a la racine de l'Arbre : \n"+racine); 
        else (console.log(" La valeur indiquée ne fait pas partie de l'arbre de Merkle"));
        }



let hashPreuve = sha256(program.preuve).toString();
let tablePreuve = [];


tablePreuve.push(hashPreuve);
tablePreuve.push(rechercheFrere(hashPreuve));
tablePreuve.push(rechercheOncle(hashPreuve));
console.log(tablePreuve);

affichConfirm(hashPreuve);


}

})


program.parse(process.argv);