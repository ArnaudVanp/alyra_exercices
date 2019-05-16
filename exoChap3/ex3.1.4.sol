pragma solidity ^0.5.7;

contract Assemblee {
 
    uint public totalMembres;
    uint public countDecisions;
    mapping(address => Membres) public membres;
    mapping(uint => Decisions) public decisions;
    uint256 VoteDeadline = now+604800; //deadline du vote est à date d'ouverture du contrat Assemblee + 7 jours
   
    modifier onlyBeforeVoteDeadline() {
       require(now <= VoteDeadline, "La période de 7 jours de vote est révolue!");
        _;
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
    
    //Définir la fonction voter, 
    //qui prend pour paramètres l’indice d’une proposition de décision et un entier pour déterminer 
    //le sens du vote (0 : contre, 1: pour) et incrémente le tableau votePour ou voteContre.
    
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
    
    //Définir une fonction comptabiliser qui retourne pour un vote donné en indice 
    //la différence entre les votes pour et les votes contre. 
    //Le résultat est un nombre positif si les votes sont plutôt pour et négatif si le vote est plutôt contre. 

    function comptabiliser(uint _indice) public view returns (int){
        return int(decisions[_indice].votesPour-decisions[_indice].votesContre); 
    }
    
}
