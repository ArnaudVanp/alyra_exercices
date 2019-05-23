let user = {}
let dapp = {}

function remettreDevoir(){
  let devoir = document.getElementById("devoir").value;
  dapp.contratCredEnvoi.remettre(devoir); 
}


async function createMetaMaskDapp() {
    try {
      // Demande à MetaMask l'autorisation de se connecter
      const addresses = await ethereum.enable();
      user.address = addresses[0]
      // Connection au noeud fourni par l'objet web3
      const provider = new ethers.providers.Web3Provider(ethereum);

      let contratCredibilite = new ethers.Contract(contractAddress, contractABI, provider);
      let contratCredEnvoi = contratCredibilite.connect(provider.getSigner(user.address));

      dapp = { contratCredibilite, contratCredEnvoi, provider };
      console.log(dapp)

      
      balance();
      blockNumb();
      gasPrice();

    } catch(err) {
      // Gestion des erreurs
      console.error(err);
    }
 }

async function balance(){
    dapp.provider.getBalance(user.address).then((balance) => {
      let etherString = ethers.utils.formatEther(balance);
      document.getElementById("balance").innerHTML = JSON.stringify(etherString);    
      console.log("Balance: " + etherString);
    });
}

async function blockNumb(){
    dapp.provider.getBlockNumber().then((blockNumber)=> {
    document.getElementById("numeroBlock").innerHTML = JSON.stringify(blockNumber);    
    console.log("Numéro du dernier block :" + blockNumber);
    return blockNumber;
    });
}

async function gasPrice(){
    dapp.provider.getGasPrice().then((gasPrice) => {
        // Convertit en décimal le prix du gas qui est en "BigNumber"
    gasPriceString = gasPrice.toString();
    document.getElementById("gasPrice").innerHTML = JSON.stringify(gasPriceString);
    console.log("Le prix actuel du gas est : " + gasPriceString);
    });
}

async function credibilite(){
  dapp.contratCredibilite.cred(user.address).then((credib) => {
    let credibString = credib.toString();
    document.getElementById("cred").innerHTML = JSON.stringify(credibString);    
    console.log("Credibilité de :" + credib);
  });
}
