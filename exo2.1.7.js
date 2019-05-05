/*Récupérer la récompense en cours et le nombre de btc en circulation à un instant t */
//Passer la date en argument nodejs au format 'YYYY-MM-DD h:m'
//  (ex: '2019-05-05 12:26')

function RecompADate(date){
    let hauteur = calcHautBlock(date);
    let recompense = recompenseBloc(hauteur);
    return recompense;
}

function nbBtcCirculation(date){
    let hauteur = calcHautBlock(date);
    //console.log(hauteur+ "( hauteur estimee)")
    let btcCircul = bitcoinsEnCirculation(hauteur);
    return btcCircul;
}

/*Fonctions intermediaires : */
function calcHautBlock(date){
  
    let date1 = new Date('2009-01-03 18:15:05'); // date du block 0 bitcoin
    let date2 = new Date(date);

  var tmp = date2 - date1;
  mins = Math.floor(tmp/60000);             // Nombre de minutes entre les 2 dates
 
    let hautEstimee = Math.ceil(mins/10);
  return hautEstimee ;
}
 //console.log(calcHautBlock('2019-01-03 18:26:05'));

function recompenseBloc(hauteurBloc) {
    let pos =  Math.floor(hauteurBloc/210000);
    let calc = 50/Math.pow(2,pos);
    let result = Math.floor(calc*100000000)/100000000
    return result;
}

function btcAuPalierPrec(palierActuel) {
    let totalBtc = 0;
    if (palierActuel===0) {
        return 0;
      }
  
    else {
       for ( let i=0; i <= palierActuel-1; i++) {
          totalBtc += (Math.floor((50/Math.pow(2,i))*100000000)/100000000)*210000;
          }
      return totalBtc;
      }
  }
  
  function recompenseBloc(param) {
      let pos =  Math.floor(param/210000);
      let result = Math.floor((50/Math.pow(2,pos))*100000000)/100000000;
      return result;
  }
  
  function bitcoinsEnCirculation(hauteurBloc) {
      let palierActuel =  Math.floor(hauteurBloc/210000); 
      let btcAuPalierPrecedent = btcAuPalierPrec(palierActuel); 
      let recompActuelle = recompenseBloc(hauteurBloc); 
      let distAuPalierAct = hauteurBloc - ((palierActuel)*210000);
      let btcAuPalierActuel =  distAuPalierAct * recompActuelle + recompActuelle;
      let nbBtc =  Math.floor(btcAuPalierPrecedent + btcAuPalierActuel);
        return nbBtc;
  }

 let btc = nbBtcCirculation(process.argv[2]);
 let recomp = RecompADate(process.argv[2]);

console.log("En date du : "+process.argv[2]+", la récompense était de : "+recomp+" BTC et le nombre total de Bitcoins en circulation estimé à : \n"+btc+" Bitcoins.");
