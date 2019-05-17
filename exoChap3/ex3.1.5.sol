pragma solidity ^0.5.7;

contract Assemblee {
 
    uint public totalMembres;
    uint public countDecisions;
    uint public adminCountActif;
    mapping(address => Membres) public membres;
    mapping(uint => Decisions) public decisions;
    uint256 VoteDeadline = now+604800; //deadline du vote est à date d'ouverture du contrat Assemblee + 7 jours
    string public nomAssemblee;
    mapping(address => Admin) public administrateurs;
   
    modifier onlyBeforeVoteDeadline() {
       require(now <= VoteDeadline, "La période de 7 jours de vote est révolue!");
        _;
    }
    
    constructor(string memory _AssembleeNationale) public {
       nomAssemblee = _AssembleeNationale;
       administrateurs[msg.sender] = Admin(true);//initialise l'administrateur : celui qui a déployé le contrat
       adminCountActif ++;
    }
    
    struct Membres {
        bool estMembre;
    }
    
    struct Decisions {
       uint _idD;
       string descriptionDecisions;
       uint votesPour;
       uint votesContre;
       mapping(address => bool) aVote;
    }
    
    struct Admin {
        bool _actif; //True si membre actif False si membre inactif
    }

    function rejoindreAssemblee(address _adresseMembre) public {
        require(estMembre(_adresseMembre) == false,"Cette adresse fait déjà partie des membres de l'assemblée");
        totalMembres ++;
        membres[_adresseMembre].estMembre = true;
    }
    
    
    function estMembre(address _participant) public view returns (bool) {
        return membres[_participant].estMembre;
    }
    
    function proposerDecision(string memory _description) public {
        require(estMembre(msg.sender),"Seul un membre de l'assemblée peut proposer un décision au vote");
        countDecisions ++;
        decisions[countDecisions] = Decisions(countDecisions,_description,0,0);
    }
    
    
    function vote(uint _indiceVote, uint _sens) public onlyBeforeVoteDeadline {
        require(estMembre(msg.sender), "Vous devez être membre!");
        require(decisions[_indiceVote].aVote[msg.sender] == false, "Vous avez déjà voté pour cette question!");
        if (_sens == 0) {
                decisions[_indiceVote].votesContre += 1;
                decisions[_indiceVote].aVote[msg.sender] = true;
            } else if (_sens == 1) {
                decisions[_indiceVote].votesPour += 1;
                decisions[_indiceVote].aVote[msg.sender] = true;
            }
    }
    

    function comptabiliser(uint _indice) public view returns (int){
        return int(decisions[_indice].votesPour-decisions[_indice].votesContre); 
    }

    /*Fonctions de gestion des administrateurs*/
    
    function nommerAdmin(address _addressAdmin) public {
        require(verifAdmin(msg.sender) == true, "Vous n'êtes pas l'administrateur principal");
        require(verifAdmin(_addressAdmin) == false, "Le candidat est déjà administrateur");
        administrateurs[_addressAdmin]._actif = true;
        adminCountActif ++;
    }

    function adminDemis(address _addressAdminDemi) public {
        require(verifAdmin(msg.sender) == true, "Vous n'êtes pas administrateur");
        require(adminCountActif>1 , "Il doit y avoir au moins un administrateur en poste dans l'assemblée");
        require(administrateurs[_addressAdminDemi]._actif == true, "Cet administrateur a déjà démissionné");
        administrateurs[_addressAdminDemi]._actif = false;
        adminCountActif --;
    }
    
    function verifAdmin(address _addressVerif) public view returns (bool) {
        return administrateurs[_addressVerif]._actif;
    }

}
