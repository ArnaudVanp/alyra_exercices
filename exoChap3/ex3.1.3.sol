pragma solidity ^0.5.7;

contract Assemblee {
 
    uint256 public membresCount = 0;
    mapping(uint => Membres) public membres;
    string[] descriptionDecisions;
    uint[] votesPour;
    uint[] votesContre;
     
    struct Membres {
        uint _id;
        address _adresseMembre;
    }
    
    function rejoindreAssemblee(address _adresseMembre) public {
      membresIncrement();
      membres[membresCount] = Membres(membresCount, _adresseMembre);
    }
     
    function membresIncrement() internal {
          membresCount +=1;
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
             descriptionDecisions.push(_description);
             votesPour.push(0);
             votesContre.push(0);
            }
    }
     
    //Définir la fonction voter, 
    //qui prend pour paramètres l’indice d’une proposition de décision et un entier pour déterminer 
    //le sens du vote (0 : contre, 1: pour) et incrémente le tableau votePour ou voteContre.
    
    function vote(uint _indiceVote, uint _sens) public {
        if (_sens == 0) {
            votesContre[_indiceVote] = votesContre.push(1);
        } else if (_sens == 1) {
            votesPour[_indiceVote] = votesPour.push(1);
        }
    }
    
    //Définir une fonction comptabiliser qui retourne pour un vote donné en indice 
    //la différence entre les votes pour et les votes contre. 
    //Le résultat est un nombre positif si les votes sont plutôt pour et négatif si le vote est plutôt contre. 

    function comptabiliser(uint _indice) public view returns (int){
        return int(votesPour[_indice]-votesContre[_indice]); 
    }

}