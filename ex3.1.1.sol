pragma solidity ^0.5.6;

contract SceneOuverte {
  string[12] public passagesArtistes;
  uint public creneauxLibres = 12;
  uint public tour;
  address artiste;
  
  event Passage(
     address indexed _artistecontract,
     uint256 _tour
    );
  
  function sInscrire(string memory nomDartiste) public {
    if (creneauxLibres > 0) {
      passagesArtistes[12-creneauxLibres] = nomDartiste;
      creneauxLibres -= 1;
      emit Passage(tx.origin,tour);
    }
  }
  
  function passerArtisteSuivant() public {
      if (tour < (12-creneauxLibres)){
       tour += 1;
     }
  }

  function artisteEnCours () public view returns (string memory) {
    if (tour < (12 - creneauxLibres)) {
    return passagesArtistes[tour];
    } else {
        return"Fin";
    }
  }
}