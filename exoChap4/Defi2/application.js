let user = {}
let dapp = {}

function livraison(){
  let url = document.getElementById("livraison").value;
  dapp.contratMarcheDecentraliseEnvoi.livraison(url);
  rafraichir();
}

function inscription(){
  let nom = document.getElementById("nom_inscription").value;
  let typeUt = document.querySelector('input[name=typeUtilisateur]:checked').value;
  dapp.contratMarcheDecentraliseEnvoi.inscription(nom,typeUt);
  rafraichir();
}

function ajouterDemande(){
  let desc = document.getElementById("demande_description").value;
  let nomUti = document.querySelector('#myList option:checked').value;
  dapp.contratMarcheDecentraliseEnvoi.ajouterDemande(nomUti,desc);
  rafraichir();
}

async function connectToMetaMaskDapp() {
    try {
      // Demande à MetaMask l'autorisation de se connecter
      const addresses = await ethereum.enable();
      user.address = addresses[0]
      // Connection au noeud fourni par l'objet web3
      const provider = new ethers.providers.Web3Provider(ethereum);

      let contratMarcheDecentralise = new ethers.Contract(contractAddress, contractABI, provider);
      let contratMarcheDecentraliseEnvoi = contratMarcheDecentralise.connect(provider.getSigner(user.address));

      dapp = { contratMarcheDecentralise, contratMarcheDecentraliseEnvoi, provider };
      console.log(dapp)
      
      contratMarcheDecentralise.on('Livraison', (urlSha) => {
        document.getElementById("hash").innerHTML = JSON.stringify(urlSha);
        console.log("Voici le hash du devoir : "+urlSha);
      });

      
    } catch(err) {
      // Gestion des erreurs
      console.error(err);
    }
}

connectToMetaMaskDapp()

async function rafraichir() {
  dapp.provider.getNetwork().then(
    ntw => {document.getElementById("network").innerHTML = JSON.stringify(ntw);
    console.log(ntw)  
  })

  
}

async function listeUtilisateurs() {
  let listeLength= await dapp.contratMarcheDecentralise.countUtil();
  for (i=0; i< listeLength; i++){
  let utilisateurs= await dapp.contratMarcheDecentralise.getUtilisateursList();
  let utiliDetail = await dapp.contratMarcheDecentralise.getUtilisateurDetail(utilisateurs[i]);
  //let  listitem = document.createElement("li") //
  //listitem.innerHTML = ` ⭐ ${utilisateurs[i]} ⭐ ${utiliDetail}`
  //document.getElementById("listeUtilisateurs").appendChild(listitem)
  let  listitem = document.createElement("option")
  listitem.innerHTML = `${utiliDetail[0]}`
  document.getElementById("myList").appendChild(listitem)
  }
}

async function listeDemandes() {
  let listeLength= await dapp.contratMarcheDecentralise.countDemandes();
  for (i=0; i< listeLength; i++){
  let demandes= await dapp.contratMarcheDecentralise.getDemandesList();
  let demandeDetail = await dapp.contratMarcheDecentralise.getDemandesDetail(demandes[i]);
  let  listitem = document.createElement("li") //
  listitem.innerHTML = ` ⭐ ${demandes[i]} ⭐ ${demandeDetail} `
  document.getElementById("listeDemandes").appendChild(listitem)
  }
}