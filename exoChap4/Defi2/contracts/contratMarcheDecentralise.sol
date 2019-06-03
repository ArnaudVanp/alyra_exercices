pragma solidity ^0.5.7;
pragma experimental ABIEncoderV2;

import '/home/ubuntu/Alyra/alyra_exercices/Defi2Test/contracts/SafeMath.sol';

contract marcheDecentraliseV0 { 

    using SafeMath for uint256;
    
    mapping (address => Utilisateurs) utilisateurs;
    address[] utilisateursList;
    uint public countUtilisateurs;
    
    mapping (uint => Demandes) demandes;
    uint public countDemandes;
    uint[] demandesList;
    uint public depot;
    uint public fraisPlateforme;
    
    enum Statut {ouvert,encours,ferme}
    Statut statut;
    
    event Livraison(bytes32);
    event Inscription(string,uint);
    event DemandesEvent(string,uint,uint);

    struct Utilisateurs {
        string _nom;
        address _adresse;
        uint _reputation;
        bool _estIndependant;
        bool _estEntreprise;
    }

    struct Demandes {
        uint _demandeID;
        address _addressDemandeur;
        uint _remuneration;
        uint _delai;
        string _description;
        Statut _etat; // enum Etat {ouvert,encours,ferme}
        uint _reputationMini;
        mapping (address => bool) _candidats;
    }

    function inscription(string memory _nomUtilisateur, uint _utilisateurType) public {
        require(utilisateurs[msg.sender]._estIndependant == false && utilisateurs[msg.sender]._estEntreprise == false,"L'adresse de cet utilisateur est déjà enregistrée !");
        utilisateurs[msg.sender]._nom = _nomUtilisateur;
        if (_utilisateurType == 1) {
            utilisateurs[msg.sender]._estIndependant = true;
        } else if (_utilisateurType == 2) {
            utilisateurs[msg.sender]._estEntreprise = true;
        }
        utilisateurs[msg.sender]._reputation = 1;
        utilisateurs[msg.sender]._adresse = msg.sender;
        utilisateursList.push(msg.sender)-1;
        countUtilisateurs++;
        emit Inscription(_nomUtilisateur,_utilisateurType);
    }
    
    function getUtilisateursList() view public returns (address[] memory) {
        return utilisateursList;
    }
    
    function countUtil() view public returns (uint) {
        return utilisateursList.length;
    }
    
    function getUtilisateurDetail(address _addressU) view public returns (string memory,uint,bool,bool){
        return(utilisateurs[_addressU]._nom,utilisateurs[_addressU]._reputation,utilisateurs[_addressU]._estIndependant,utilisateurs[_addressU]._estEntreprise);
    }
 
    function ajouterDemande(address _adUt,uint _remu,string memory _descrip,uint _repMin) public {
        require (utilisateurs[_adUt]._estEntreprise == true,"Vous devez être une entreprise pour pouvoir ajouter une demande");
        demandes[countDemandes]._demandeID = countDemandes;
        demandes[countDemandes]._addressDemandeur = msg.sender;
        demandes[countDemandes]._remuneration = _remu;
        demandes[countDemandes]._description = _descrip;
        demandes[countDemandes]._etat = Statut.ouvert;
        demandes[countDemandes]._reputationMini = _repMin;
        // autre possibilité: Demandes.push(Demande(parametre du struct). (Demande[] public Demandes)
        demandesList.push(countDemandes);
        emit DemandesEvent(_descrip,_remu,_repMin);
        countDemandes ++;
    }
    
    function getDemandesList() view public returns (uint[] memory) {
        return demandesList;
    }
    
    function getDemandesDetail(uint _id) view public returns (uint,address,uint,uint,string memory,Statut,uint) {
        return(demandes[_id]._demandeID,demandes[_id]._addressDemandeur,demandes[_id]._remuneration,
        demandes[_id]._delai,demandes[_id]._description,demandes[_id]._etat,demandes[_id]._reputationMini);
    }

    function accepterOffre(address _addUti, uint _id, address _candidat) public {
        require (utilisateurs[_addUti]._estEntreprise == true,"Vous devez être une entreprise pour pouvoir accepter une offre");
        require (demandes[_id]._candidats[_candidat],"Il ne s'agit pas d'un candidat");
        demandes[_id]._candidats[_candidat] = true;
        demandes[_id]._etat = Statut.encours;
        demandes[_id]._delai = now;//initialise le timer
    }
    
    function depotUpdate(uint _idDemande) public payable {
        depot += demandes[_idDemande]._remuneration;
        fraisPlateforme += SafeMath.div(SafeMath.mul(demandes[_idDemande]._remuneration,102),100);
    }

    function postuler(address _adresse, uint _id) public {
        require (utilisateurs[_adresse]._estIndependant == true,"Vous devez être un indépendant pour pouvoir postuler à une demande");
        demandes[_id]._candidats[_adresse] = false;
    }
    
    function livraison(uint _id,string memory _url,address _candidat) public returns(bytes32) {
        require(utilisateurs[_candidat]._estIndependant == true,"Vous devez être un indépendant pour pouvoir livrer votre travail");
        require(demandes[_id]._candidats[_candidat] == true,"Votre offre n'a pas été acceptée par l'entreprise - vous ne pouvez pas livrer votre travail");
        bytes memory _bytes = bytes(_url);
        bytes32 urlSha= keccak256(_bytes);
        emit Livraison(urlSha);
        demandes[_id]._etat = Statut.ferme;
        utilisateurs[_candidat]._reputation ++;
        msg.sender.transfer(demandes[_id]._remuneration);
        depot -= demandes[_id]._remuneration;
        return keccak256(_bytes);
    }

 
 }