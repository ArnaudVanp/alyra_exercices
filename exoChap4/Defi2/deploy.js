const fs = require('fs')
const ethers = require('ethers')
const output = require('./build/contratMarcheDecentralise')
const so = output.contracts['contracts/contratMarcheDecentralise.sol:marcheDecentraliseV0']

async function deployAll() {
 let provider = new ethers.providers.JsonRpcProvider("http://localhost:8545")
 const signer = provider.getSigner(0)
 let factory = new ethers.ContractFactory(so.abi, so.bin,signer)
 let contract = await factory.deploy()
 console.log('En deploiement:',contract.address)
 fs.writeFile("src/data.js", "data="+JSON.stringify(contract), function(err) {
     if (err){
         console.log(err);
     }
 })
await contract.deployed();
console.log("deployé");

}
deployAll()