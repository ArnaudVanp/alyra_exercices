pragma solidity ^0.5.7;

contract CagnotteFestival{

    mapping (uint => Organisateur) public organisateurs;
    uint256 public orgaCount = 0;

    constructor() public {
        organisateurs[0]._addressOrganisateur = msg.sender;
        organisateurs[0]._part = 100;
    }   
    
    struct Organisateur {
       address _addressOrganisateur;
       uint _part;
    }
    
    function orgaIncrement() internal {
        orgaCount ++;
    }
    
    function ajoutOrga(address _newOrga) public {
        require(estOrga(_newOrga) == false, "Cette addresse fait déjà partie des organisateurs");
        orgaIncrement();
        organisateurs[orgaCount] = Organisateur(_newOrga,0);
    }
        
     
    //permet de transférer une part de sa responsabilité à un nouvel organisateur.
    function transfererOrga(address _orga, uint _parts) public { 
        require(estOrga(msg.sender) == true, "Vous devez être organisateur pour transferer vos parts");
        require(estOrga(_orga) == true, "L'adresse destinataire doit faire partie des organisateurs");
        
        for (uint i=0; i <= orgaCount; i++){
            if(msg.sender == organisateurs[i]._addressOrganisateur && organisateurs[i]._part >= _parts){
                organisateurs[i]._part -= _parts;
            }
        }
        
        for (uint i=0; i <= orgaCount; i++){
            if(_orga == organisateurs[i]._addressOrganisateur && organisateurs[i]._part <= (100-_parts)){
                organisateurs[i]._part += _parts;
            }
        }
    }

    //qui permet de savoir si le propriétaire d’une adresse Ethereum donnée fait partie des organisateurs.
    function estOrga(address _orga) public view returns (bool){
        for (uint i=0; i <= orgaCount; i++){
            if(_orga == organisateurs[i]._addressOrganisateur){
               return true;
            }
         } return false;
    }
 


}