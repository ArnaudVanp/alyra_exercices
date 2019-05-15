pragma solidity ^0.5.7;

contract Assemblee {
 
    uint public totalMembres;
    mapping(address => Membres) public membres;
    
    struct Membres {
        bool estMembre;
    }

    function rejoindreAssemblee(address _adresseMembre) public {
        require(estMembre(_adresseMembre) == false,"Cette adresse fait déjà partie des membres de l'assemblée");
        totalMembres ++;
        membres[_adresseMembre].estMembre = true;
    }
    
    function estMembre(address _participant) public view returns (bool) {
        return membres[_participant].estMembre;
    } 
}
