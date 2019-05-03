/*Défi Semaine 1 et 2 Explorateur Bitcoin*/

const express = require('express');
const app = express();

//le module de templating 'mustache'
const mustacheExpress = require('mustache-express');

app.engine('html',mustacheExpress()); // indique à l'app quel module de templating HTML 
app.set('views',__dirname + '/views'); // indique l'endroit où se trouvent nos modeles html
app.set('view engine','html'); 

app.use(express.static('public')); //nous permet d'acceder en localhost au dossier "public"


const Client = require('bitcoin-core');
const client = new Client({ 
  network: 'regtest', 
  username: 'bitcoin', 
  password: 'bitcoin', 
  port: 18443 
});

//route racine
 app.get('/', function(req,res){
  res.render('index.html');
}); 

app.get('/exploreurbtc', function(req,res){
  res.render('exploreurbtc.html');
}); 

// route pour la recherche
app.get('/searchabloc', function(req,res){

// recuperer le contenu de la recherche  
var hashBlock = req.query.search;
console.log(hashBlock);

/************************************************************************/

//fonction de retraitement Cible 256bits hex.
function convertirBits(bits){
  let longueurChaine = parseInt(bits.substring(0,2),16); 
  let debutChaine = bits.substring(2,8);  //6 caracteres
  let contenuChaine = debutChaine+"0".repeat(longueurChaine*2-6); // 6 caracteres + des zeros --> jusqu'à 64
  let resultat = "0".repeat(64-(longueurChaine*2))+contenuChaine;
  return resultat;
}

//fonction valeur décimale de la cible de difficulté
function calculCible(bits){
  cible = parseInt(convertirBits(bits),16);
  return cible;
}

//fonction calcul de la difficulté
function calculDifficulte(bits){
  let difficulte= calculCible('1d00ffff')/calculCible(bits);
  return difficulte;
}

//recuperer les infos et les "render" grace au modele exploreurbtc.html
// en cas d'erreur, renvoyer uniquement un tag avec du texte dedans
client.getBlockByHash(hashBlock , 
  function(err, succes) {
    if (err) res.send("<h4 class='failure'>Aucun bloc trouvé avec un Hash de valeur : " + hashBlock + "</h4>");
    else {
      let date = new Date(succes.time*1000)
      succes.time = succes.time+" > "+date.toUTCString();

      succes.bits = succes.bits+" > "+convertirBits(succes.bits)+" > "+calculCible(succes.bits)+" > "+calculDifficulte(succes.bits);
      res.render('results_exploreurbtc.html', succes );
    }
  }); 
 
});

//ecouter le port 3000 
let port = Number(process.env.PORT || 3000);  
app.listen(port, function(){  
  console.log("Listening on port "+ port + "...");   
});   


// Liste de Hashs Valides
//10249cbf45ceed90b27d6d36cc75261ab88dbcb924e7426ac6c6025cddb92017
//7280475ec7f5eb02c5869af83e5d4c9619b42ae59c7b7a9180b2eb344e34b09f
//416eb48bf10d1e87af490559adf7c938c6483f4103ace27e355d8dfeba439875
//634da0187b0f666497c81ea4a90312478dc1ca7a84541c09f62927fce033cd32
//503adc50a99b38ac9864ea9efd7bf913af2f8f6e5e84ccbc81896e5323ff1d52