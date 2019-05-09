pragma solidity ^0.5.7;

contract Assemblee {
 
 uint256 public membresCount = 0;
 mapping(uint => Membres) public membres;
 
 struct Membres {
    uint _id;
    address _adresseMembre;
 }

 function rejoindreAssemblee(address _adresseMembre) public {
  membresIncrement();
  membres[membresCount] = Membres(membresCount, _adresseMembre);
 }
 
 function membresIncrement() public {
      membresCount +=1;
 }
 
 function estMembre(address _participant) public view returns (string memory) {
     for (uint i=0; i <= membresCount; i++){
         if(_participant == membres[i]._adresseMembre){
            return "Le participant est bien membre de l'assemblée !";
         }
     } return "Le participant n'est pas membre de l'assemblée !";
 }
 
}