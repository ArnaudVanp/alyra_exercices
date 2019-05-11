pragma solidity ^0.5.7;

contract Assemblee {
 
    uint256 public membresCount = 0;
    uint256 public decisionsCount = 0;
    uint256 public adminCount = 0;
    uint256 public adminCountActif = 0;
    mapping(uint => Membres) public membres;
    mapping(uint => Decisions) public decisions;
    uint256 VoteDeadline = now+604800; //deadline du vote est à date d'ouverture du contrat Assemblee + 7 jours
    string public nomAssemblee;
    mapping(uint => Admin) public administrateurs;
    
    constructor(string memory _AssembleeNationale) public {
       nomAssemblee = _AssembleeNationale;
       administrateurs[0] = Admin(0, msg.sender,1);//initialise l'administrateur : celui qui a déployé le contrat.
       adminIncrement();
       adminCountActif ++;
    }
    
    modifier onlyBeforeVoteDeadline() {
       require(now <= VoteDeadline, "La période de 7 jours de vote est révolue!");
        _;
    }
    
    struct Admin {
        uint _adminId;
        address _adresseAdmin;
        uint _actif; //1 si membre actif 0 si membre inactif
    }
     
    struct Membres {
        uint _id;
        address _adresseMembre;
        uint _blame;
    }
    
    struct Decisions {
       uint _idD;
       string descriptionDecisions;
       uint _valide; // 1 si la proposition de décision est valide, 0 si elle a été annulée par un administrateur
       uint votesPour;
       uint votesContre;
       mapping(address => bool) aVote;
    }
    
    
    function rejoindreAssemblee(address _adresseMembre) public {
      require(estMembre(msg.sender)==false, "Vous êtes déja membre de l'assemblée!");
      membresIncrement();
      membres[membresCount] = Membres(membresCount, _adresseMembre,0);
    }
     
    function membresIncrement() internal {
          membresCount +=1;
    }
    
    function decisionIncrement() internal {
        decisionsCount +=1;
    }
     
    function adminIncrement() internal {
        adminCount += 1;
    } 
    
    function estMembre(address _participant) public view returns (bool) {
         for (uint i=0; i <= membresCount; i++){
             if(_participant == membres[i]._adresseMembre && membres[i]._blame < 2){
                return true;
             }
         } return false;
    }
    
    function blameMembre(address _participant) public {
        require(verifAdmin(msg.sender) == true, "Seuls les administrateurs en poste peuvent blâmer un membre");
        for (uint i=0; i <= membresCount; i++){
            if(_participant == membres[i]._adresseMembre && membres[i]._blame < 2){
                membres[i]._blame += 1;
            }
        }
    }
    
    function proposerDecision(string memory _description) public {
         if(estMembre(msg.sender))
          {
             decisionIncrement();
             decisions[decisionsCount] = Decisions(decisionsCount,_description,1,0,0);
          }
    }
    
    function suppDecision(uint256 _indiceDecision) public {
        require(verifAdmin(msg.sender) == true, "Vous devez être administrateur en poste pour annuler une proposition");
        decisions[_indiceDecision]._valide = 0;
    }
    
    
    function vote(uint _indiceVote, uint _sens) public onlyBeforeVoteDeadline {
        require(estMembre(msg.sender), "Vous devez être membre!");
        require(decisions[_indiceVote].aVote[msg.sender] == false, "Vous avez déjà voté pour cette question!");
        require(decisions[_indiceVote]._valide != 0, "Cette décision n'est plus disponible au vote");
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
        adminIncrement();
        administrateurs[adminCount-1] = Admin(adminCount-1, _addressAdmin,1);
        adminCountActif ++;
    }
    
    
    function adminDemis(address _addressAdminDemi) public {
        require(verifAdmin(msg.sender) == true, "Vous n'êtes pas administrateur");
        require(adminCountActif>1, "Il doit y avoir au moins un administrateur en poste dans l'assemblée");
        for (uint i=0; i <= adminCount; i++){
            if(_addressAdminDemi == administrateurs[i]._adresseAdmin && administrateurs[i]._actif == 1){
                administrateurs[i] = Admin(i, _addressAdminDemi,0);
                adminCountActif --;
             }
         }
    }
    
    function verifAdmin(address _addressVerif) public view returns (bool) {
        for (uint i=0; i <= adminCount; i++){
             if(_addressVerif == administrateurs[i]._adresseAdmin && administrateurs[i]._actif == 1){
               return true;
             }
         } return false;
    }
}

    