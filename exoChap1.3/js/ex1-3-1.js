const program = require('commander');

let alphaB = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

let tempTab = [];


program
.version('1.0.0')
.parse(process.argv)

    function chiffreCesar(mot,decalage) {
    let tableMot = Array.from(mot);
    j = 0;

    
    for (i = 0; i <= tableMot.length-1; i++){
     
    if(alphaB.indexOf(tableMot[i]) == -1 )
    { console.log(tableMot[i] + " n'est pas un caractère valide."); }
        else 
        {       
            while (tableMot[i] != alphaB[j]){
                 j++; 
            }
                  
            if (j+decalage <= 25){
                tempTab.push((alphaB[j+decalage]));
                j = 0;
                } else {
                nouvellePlace = (j+decalage)%25 == 0 ? j : (j+decalage)%25 ;   
                tempTab.push((alphaB[nouvellePlace]));
                j = 0;
                } 
        }
    }
}

chiffreCesar(process.argv[2].toString().toLowerCase(),parseInt(process.argv[3]));
let resultat = tempTab.toString().split(',').join("");
console.log("Le mot après chiffrement de césar est: "+resultat);