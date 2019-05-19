pragma solidity ^0.5.7;

import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-solidity/master/contracts/math/SafeMath.sol";

contract Cogere {
    
    using SafeMath for uint256;
    mapping (address => Organisateur) public organisateurs;
    uint public orgaCount;
    uint public debutFestival;
    uint public dateLiquidation;
    
    modifier onlyBeforeDestruction() {
       require(orgaCount > 0, "Le festival est terminé");
        _;
     }

    constructor() public {
        organisateurs[msg.sender]._part = 100;
        organisateurs[msg.sender].estOrga = true;
        orgaCount ++;
        debutFestival = now;
        dateLiquidation = debutFestival + 2 weeks;
    }   
    
    struct Organisateur {
       uint _part;
       bool estOrga;
    }
    
    function ajoutOrga(address _newOrga) public onlyBeforeDestruction {
        require(estOrga(_newOrga) == false, "Cette addresse fait déjà partie des organisateurs");
        organisateurs[_newOrga]._part = 0;
        organisateurs[_newOrga].estOrga = true;
        orgaCount ++;
    }
        
     
    //permet de transférer une part de sa responsabilité à un nouvel organisateur.
    function transfererOrga(address _orga, uint _parts) public onlyBeforeDestruction { 
        require(estOrga(msg.sender) == true, "Vous devez être organisateur pour transferer vos parts");
        require(estOrga(_orga) == true, "L'adresse destinataire doit faire partie des organisateurs");
        require(organisateurs[msg.sender]._part >= _parts, "L'organisateur à l'origine du transfer n'a pas assez de part");
        require(organisateurs[_orga]._part <= (100-_parts), "Le destinataire a trop de parts pour recevoir ce transfer");
        
        organisateurs[msg.sender]._part = SafeMath.sub(organisateurs[msg.sender]._part,_parts);
        organisateurs[_orga]._part = SafeMath.add(organisateurs[_orga]._part,_parts);
    }

    //qui permet de savoir si le propriétaire d’une adresse Ethereum donnée fait partie des organisateurs.
    function estOrga(address _orga) public onlyBeforeDestruction view returns (bool) {
        return organisateurs[_orga].estOrga;
    }
    
 
}

contract CagnotteFestival is Cogere {
    
    mapping (address => bool) public festivaliers;
    uint placesRestantes = 200;
    uint public depensesTotales;
    uint public solde;
    uint public montantbilleterie;
    uint public montantSponsors;
    mapping (uint => Sponsor) public sponsors;
    uint public countSponsor;
    uint public nbJourRestant=1;
    address public addressPreced;
    
    struct Sponsor {
        uint _sponsId;
        string _nomSponsor;
        uint _valueSponsor;
    }

    //on ajoute un mapping des festivaliers qui retourne pour chaque adresse de festivalier 
    //s’il possède ou non un billet. Pour fixer un prix, les montants sont en principe exprimé en wei, 
    //la plus petite subdivision de l’Ether ( 10⁻¹⁸ Ethers).
 
    //achat de billets
    function acheterTicket() public payable onlyBeforeDestruction {
        require(msg.value >= 500 finney,"Place à 0.5 Ethers");
        require(placesRestantes > 0,"Plus de places !");
        festivaliers[msg.sender] = true;
        placesRestantes --;
        montantbilleterie += msg.value;
    }
    
    function depensesTotalesUpdate(uint montant) public onlyBeforeDestruction returns(uint)  {
        depensesTotales = SafeMath.add(depensesTotales,montant);
        return depensesTotales;
    }
    
    function soldeUpdate(uint value) public onlyBeforeDestruction returns(uint)  {
       solde = SafeMath.sub(SafeMath.add(montantSponsors,montantbilleterie),depensesTotalesUpdate(value));
       return solde;
    }
    
    //fonction pour que les organisateurs puissent dépenser leurs fonds
    function payer(address payable destinataire, uint montant) public payable onlyBeforeDestruction {
       require(estOrga(msg.sender),"L'addresse utilisée n'est celle d'un organisateur");
       require(destinataire != address(0));
       require(montant > 0);
       soldeUpdate(0);
       seuilJourDepense();
       require(SafeMath.div(SafeMath.mul(organisateurs[msg.sender]._part,(SafeMath.div(solde,nbJourRestant))),100)>= montant,"Vous n'avez pas les fonds nécessaires"); // contrôle des dépenses avec un seuil par jour au moyen d’une fonction interne
       depensesTotalesUpdate(montant);
       destinataire.transfer(montant);
       soldeUpdate(0);
    }
    
    function seuilJourDepense() public onlyBeforeDestruction {
        if(SafeMath.div((now - debutFestival),86400)<14){
            nbJourRestant += SafeMath.sub(14,SafeMath.div((now - debutFestival),86400));
        }
    }

    
    function sponsoriser(string memory nom) public payable onlyBeforeDestruction {
        require(msg.value >= 30 ether, "Le montant minimum du sponsorship est de 30 Ethers");
        sponsors[countSponsor] = Sponsor(countSponsor,nom,msg.value);
        countSponsor ++;
        montantSponsors += msg.value;
    }

    //Ajouter le contrôle du nombre de places définies initialement
    function contrPlace() public view returns (uint){
        return placesRestantes;
    }

    function retraitOrganisateurs(address payable _addressOrga) public onlyBeforeDestruction {
        require(block.timestamp >= dateLiquidation, "Le festival n'est pas terminé");
        require(estOrga(_addressOrga) == true,"Cette addresse ne fait pas partie des organisateurs");
        require(organisateurs[_addressOrga].estOrga == true,"Cet organisateur s'est déjà retiré");
        
        organisateurs[_addressOrga]._part = SafeMath.add(organisateurs[_addressOrga]._part,organisateurs[addressPreced]._part);
        organisateurs[addressPreced]._part = SafeMath.sub(organisateurs[addressPreced]._part,organisateurs[addressPreced]._part);
        
        soldeUpdate(0);
        uint cagnotteFinale = solde;
        uint retrait = SafeMath.div(SafeMath.mul(organisateurs[_addressOrga]._part,cagnotteFinale),100);//retrait de la totalité des parts de l'organisateur.
        payer(_addressOrga,retrait);// récupère le montant lié à ses parts.
        organisateurs[_addressOrga].estOrga = false;// n'est plus organisateur.
        orgaCount --;
        addressPreced = _addressOrga;
        
        if(orgaCount == 1){
            autodestruction(_addressOrga);
        }
        
       
    }
    
        function autodestruction(address payable _addressFin) private {
            retraitOrganisateurs(_addressFin);
            orgaCount = 0;
        }


}
