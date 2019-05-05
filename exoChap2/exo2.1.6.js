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
      let nbBtc =  btcAuPalierPrecedent + btcAuPalierActuel;
        return nbBtc;
  }
