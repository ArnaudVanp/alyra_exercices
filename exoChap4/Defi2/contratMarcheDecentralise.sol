pragma solidity ^0.5.7;
pragma experimental ABIEncoderV2;

import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-solidity/master/contracts/math/SafeMath.sol";

contract marcheDecentraliseV0 {

    using SafeMath for uint256;
    mapping (string => Utilisateurs) utilisateurs;
    string[] utilisateursList;
    mapping (uint => Demandes) demandes;
    uint public countDemandes;
    uint public countUtilisateurs;
    uint[] demandesList;
    enum Statut {ouvert,encours,ferme}
    Statut statut;
    event Livraison(bytes32);
    event Inscription(string,uint);

    struct Utilisateurs {
        string _nom;
        address _utilisateurAddress;
        uint _reputation;
        bool _estIndependant;
        bool _estEntreprise;
    }

    struct Demandes {
        uint _demandeID;
        address _addressDemandeur;
        uint _remunaration;
        uint _delai;
        string _description;
        string _etat; // enum Etat {ouvert,encours,ferme}
        uint _reputationMini;
        mapping (address => bool) candidats;
    }

    function inscription(string memory _nomUtilisateur, uint _utilisateurType) public {
        utilisateurs[_nomUtilisateur]._nom = _nomUtilisateur;
        utilisateurs[_nomUtilisateur]._utilisateurAddress = msg.sender;
        if (_utilisateurType == 1) {
            utilisateurs[_nomUtilisateur]._estIndependant = true;
        } else if (_utilisateurType == 2) {
            utilisateurs[_nomUtilisateur]._estEntreprise = true;
        }
        utilisateurs[_nomUtilisateur]._reputation = 1;
        utilisateursList.push(_nomUtilisateur)-1;
        countUtilisateurs++;
        emit Inscription(_nomUtilisateur,_utilisateurType);
    }
    
    function getUtilisateursList() view public returns (string[] memory) {
        return utilisateursList;
    }
    
    function countUtil() view public returns (uint) {
        return utilisateursList.length;
    }
    
    function getUtilisateurDetail(string memory _nom) view public returns (string memory,address,uint,bool,bool){
        return(utilisateurs[_nom]._nom,utilisateurs[_nom]._utilisateurAddress,utilisateurs[_nom]._reputation,utilisateurs[_nom]._estIndependant,utilisateurs[_nom]._estEntreprise);
    }
 
    function ajouterDemande(string memory _nomUtilisateur, string memory _descrip) public {
        require (utilisateurs[_nomUtilisateur]._estEntreprise == true,"Vous devez être une entreprise pour pouvoir ajouter une demande");
        //demandes[_demander]._etat = statut.ouvert;
        demandes[countDemandes]._demandeID = countDemandes;
        demandes[countDemandes]._description = _descrip;
        demandes[countDemandes]._addressDemandeur = msg.sender;
        demandesList.push(countDemandes);
        countDemandes ++;
        //ajouter reputation, liste candidats, remuneration et delai.
    }
    
    function getDemandesList() view public returns (uint[] memory) {
        return demandesList;
    }
    
    function getDemandesDetail(uint _id) view public returns (uint, address, string memory) {
        return(demandes[_id]._demandeID, demandes[_id]._addressDemandeur, demandes[_id]._description);
    }

    function accepterOffre(string memory _nomUtilisateur, uint _id, address _candidat) public view {
        require (utilisateurs[_nomUtilisateur]._estEntreprise == true,"Vous devez être une entreprise pour pouvoir accepter une offre");
        require (demandes[_id].candidats[_candidat],"Il ne s'agit pas d'un candidat");
        demandes[_id].candidats[_candidat] == true;
        //demandes[msg.sender]._etat = Statut.encours;
    }

    function postuler(string memory _nomUtilisateur, uint _id) public {
        require (utilisateurs[_nomUtilisateur]._estIndependant == true,"Vous devez être un indépendant pour pouvoir postuler à une offre");
        demandes[_id].candidats[msg.sender] = true;
    }
    
    function livraison(string memory _url) public returns(bytes32) {
        bytes memory _bytes = bytes(_url);
        bytes32 urlSha= keccak256(_bytes);
        emit Livraison(urlSha);
        return keccak256(_bytes);
    }

 
 }