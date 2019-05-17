pragma solidity ^0.5.7;

contract CagnotteFestival{

    mapping (address => Organisateur) public organisateurs;
    uint public orgaCount;

    constructor() public {
        organisateurs[msg.sender]._part = 100;
        organisateurs[msg.sender].estOrga = true;
        orgaCount ++;
    }   
    
    struct Organisateur {
       uint _part;
       bool estOrga;
    }
    
    function ajoutOrga(address _newOrga) public {
        require(estOrga(_newOrga) == false, "Cette addresse fait déjà partie des organisateurs");
        organisateurs[_newOrga]._part = 0;
        organisateurs[_newOrga].estOrga = true;
        orgaCount ++;
    }
        
     
    //permet de transférer une part de sa responsabilité à un nouvel organisateur.
    function transfererOrga(address _orga, uint _parts) public { 
        require(estOrga(msg.sender) == true, "Vous devez être organisateur pour transferer vos parts");
        require(estOrga(_orga) == true, "L'adresse destinataire doit faire partie des organisateurs");
        require(organisateurs[msg.sender]._part >= _parts, "L'organisateur à l'origine du transfer n'a pas assez de part");
        require(organisateurs[_orga]._part <= (100-_parts), "Le destinataire a trop de parts pour recevoir ce transfer");
        
        organisateurs[msg.sender]._part -= _parts;
        organisateurs[_orga]._part += _parts;
    }

    //qui permet de savoir si le propriétaire d’une adresse Ethereum donnée fait partie des organisateurs.
    function estOrga(address _orga) public view returns (bool){
        return organisateurs[_orga].estOrga;
    }
 
}
