pragma solidity ^0.5.7;

import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-solidity/master/contracts/math/SafeMath.sol";

contract Credibilite {
  
    using SafeMath for uint256;
    mapping (address => uint256) public cred;
    mapping(address => bytes32) private devoirs;
    uint public classement;
    
    event Remettre(address expediteur, bytes32 expedSha);
    
    function produireHash(string memory _url) internal pure returns(bytes32) {
        bytes memory _bytes = bytes(_url);
        return keccak256(_bytes);
    }
    
    function transfer(address destinataire, uint256 _valeur) public {
        require(cred[msg.sender] > _valeur,"Vous n'avez pas assez de point crédibitilité à transferer");
        require(SafeMath.sub(cred[msg.sender],_valeur)>=1,"Vous ne pouvez pas tranferer la totalité votre crédibitilité");
        cred[destinataire] += _valeur;
        cred[msg.sender] -= _valeur;
    }
    
   function remettre(string memory _url) public returns (uint){
         bytes32 _urlSha = produireHash(_url);
         bytes32 expedSha = _urlSha;
         if (classement == 0) {
             cred[msg.sender] += 30;
         } else if (classement == 1) {
             cred[msg.sender] += 20;
         } else {
             cred[msg.sender] += 10;
         }
         address expediteur = msg.sender;
         classement ++;
         emit Remettre(expediteur,expedSha);
         return(classement);
   }

}