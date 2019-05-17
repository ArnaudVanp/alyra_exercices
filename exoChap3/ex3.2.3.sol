pragma solidity ^0.5.7;

import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-solidity/master/contracts/math/SafeMath.sol";

contract Cogere {
    
    using SafeMath for uint256;
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
        
        organisateurs[msg.sender]._part = SafeMath.sub(organisateurs[msg.sender]._part,_parts);
        organisateurs[_orga]._part = SafeMath.add(organisateurs[_orga]._part,_parts);
    }

    //qui permet de savoir si le propriétaire d’une adresse Ethereum donnée fait partie des organisateurs.
    function estOrga(address _orga) public view returns (bool){
        return organisateurs[_orga].estOrga;
    }
 
}

contract CagnotteFestival is Cogere {
    
    mapping (address => bool) public festivaliers;
    uint placesRestantes = 200;
    uint private depensesTotales;
    mapping (uint => Sponsor) public sponsors;
    uint public countSponsor;
    
    struct Sponsor {
        uint _sponsId;
        string _nomSponsor;
        uint _valueSponsor;
    }

    //on ajoute un mapping des festivaliers qui retourne pour chaque adresse de festivalier 
    //s’il possède ou non un billet. Pour fixer un prix, les montants sont en principe exprimé en wei, 
    //la plus petite subdivision de l’Ether ( 10⁻¹⁸ Ethers).
 
    //achat de billets
    function acheterTicket() public payable {
        require(msg.value >= 500 finney,"Place à 0.5 Ethers");
        require(placesRestantes > 0,"Plus de places !");
        festivaliers[msg.sender] = true;
        placesRestantes --;
    }
    
    //fonction pour que les organisateurs puissent dépenser leurs fonds
    function payer(address payable destinataire, uint montant) public {
       require(estOrga(msg.sender));
       require(destinataire != address(0));
       require(montant > 0);
       destinataire.transfer(montant);
    }

    function comptabiliserDepense(uint montant) private {
       depensesTotales += montant;
    }
    
    function sponsoriser(string memory nom) public payable {
        require(msg.value >= 30 ether, "Le montant minimum du sponsorship est de 30 Ethers");
        sponsors[countSponsor] = Sponsor(countSponsor,nom,msg.value);
        countSponsor ++;
    }

    //Ajouter le contrôle du nombre de places définies initialement
    function contrPlace() public view returns (uint){
        return placesRestantes;
    }
    
}
