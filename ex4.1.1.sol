pragma solidity ^0.5.7;

import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-solidity/master/contracts/math/SafeMath.sol";

contract Credibilite {
  
    using SafeMath for uint256;
    
    mapping (address => uint256) public cred;
    
    bytes32[] private devoirs;
    uint public classement;
    
    function produireHash(string memory _url) internal pure returns(bytes32) {
        bytes memory _bytes = bytes(_url);
        return keccak256(_bytes);
    }
    
    function transfer(address destinataire, uint256 _valeur) public {
        require(cred[msg.sender] > _valeur,"Vous n'avez pas assez de point crédibitilité à transferer");
        require(SafeMath.sub(cred[msg.sender],_valeur)>=1,"Vous ne pouvez pas tranferer la totalité votre crédibitilité");
        cred[destinataire] += _valeur;
    }
    
   function remettre(bytes32 _dev) public returns (uint){
         devoirs.push(_dev);
         classement ++;
         return(classement);
   }

}