pragma solidity ^0.5.7;

contract Cogere {

    mapping (uint => Organisateur) public organisateurs;
    uint256 public orgaCount = 0;

    constructor() internal {
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

contract CagnotteFestival is Cogere {
    
    mapping (address => bool) public festivaliers;
    uint256 placesRestantes = 200;
    uint private depensesTotales;
    mapping (uint => Sponsor) public sponsors;
    uint256 public countSponsor =0;
    
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
    
    function sponsorIncrement() internal {
        countSponsor ++;
    }
    
    function sponsoriser(string memory nom) public payable {
        require(msg.value >= 30 ether, "Le montant minimum du sponsorship est de 30 Ethers");
        sponsors[countSponsor] = Sponsor(countSponsor,nom,msg.value);
        sponsorIncrement();
    }

    //Ajouter le contrôle du nombre de places définies initialement
    function contrPlace() public view returns (uint){
        return placesRestantes;
    }
    

}