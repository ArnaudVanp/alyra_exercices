pragma solidity ^0.5.7;

contract Pulsation  {

    uint public battement;
    string private message;

    constructor(string  memory _message) public {
        battement = 0;
        message = _message;
    }

    function ajouterBattement() public returns(string memory) {
        battement ++;
        return message;
    }

}

contract Pendule {

     string[] public balancier;
     Pulsation tac;
     Pulsation tic;
     Pulsation init;
    
     function ajouterTacTic(Pulsation _tic, Pulsation _tac) public {
         tac = _tac;
         tic = _tic;
         init = tic;
     }
    
     function mouvementsBalancier() public {
         balancier.push(init.ajouterBattement());
         if(init == tac) init = tic;
         else init = tac;
     }
     
}