pragma solidity ^0.5.7;

contract Assemblee {
 
    uint256 public membresCount = 0;
    uint256 public decisionsCount = 0;
    mapping(uint => Membres) public membres;
    mapping(uint => Decisions) public decisions;
    uint256 VoteDeadline = now+604800; //deadline du vote est à date d'ouverture du contrat Assemblee + 7 jours
    
    modifier onlyBeforeVoteDeadline() {
       require(now <= VoteDeadline, "La période de 7 jours de vote est révolue!");
        _;
    }
     
    struct Membres {
        uint _id;
        address _adresseMembre;
    }
    
    struct Decisions {
       uint _idD;
       string descriptionDecisions;
       uint votesPour;
       uint votesContre;
       mapping(address => bool) aVote;
    }
    
    
    function rejoindreAssemblee(address _adresseMembre) public {
      require(estMembre(msg.sender)==false, "Vous êtes déja membre de l'assemblée!");
      membresIncrement();
      membres[membresCount] = Membres(membresCount, _adresseMembre);
    }
     
    function membresIncrement() internal {
          membresCount +=1;
    }
    
    function decisionIncrement() internal {
        decisionsCount +=1;
    }
     
    
    function estMembre(address _participant) public view returns (bool) {
         for (uint i=0; i <= membresCount; i++){
             if(_participant == membres[i]._adresseMembre){
                return true;
             }
         } return false;
    }
    
    
    function proposerDecision(string memory _description) public {
         if(estMembre(msg.sender))
          {
             decisionIncrement();
             decisions[decisionsCount] = Decisions(decisionsCount,_description,0,0);
          }
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
    
    
}