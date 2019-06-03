let user = {}
let dapp = {}

async function connectToMetaMaskDapp() {
    try {
      // Demande à MetaMask l'autorisation de se connecter
      const addresses = await ethereum.enable();
      user.address = addresses[0]
      // Connection au noeud fourni par l'objet web3
      const provider = new ethers.providers.Web3Provider(ethereum);

      let contratMarcheDecentralise = new ethers.Contract(data.address, data.interface.abi, provider);
      let contratMarcheDecentraliseEnvoi = contratMarcheDecentralise.connect(provider.getSigner(user.address));

      dapp = { contratMarcheDecentralise, contratMarcheDecentraliseEnvoi, provider };
      console.log(dapp)
     
      contratMarcheDecentralise.on('Livraison', (urlSha) => {
        document.getElementById("hash").innerHTML = JSON.stringify(urlSha);
        console.log("Voici le hash du devoir : "+urlSha);
      });
      
      
      //rafraichissement dynamique//

      dapp.contratMarcheDecentralise.on('Inscription',(_nomUtilisateur,_utilisateurType) =>{
        listeUtilisateurs();
      });

      dapp.contratMarcheDecentralise.on('DemandesEvent',(_descrip,_remu,_repMin) =>{
        listeDemandes();
      });
      
      rafraichir();
            
    } catch(err) {
      // Gestion des erreurs
      console.error(err);
    }
}

connectToMetaMaskDapp();

function livraison(){
  let url = document.getElementById("livraison").value;
  dapp.contratMarcheDecentraliseEnvoi.livraison(url);
}

async function inscription(){
  let nom = document.getElementById("nom_inscription").value;
  let typeUt = document.querySelector('input[name=typeUtilisateur]:checked').value;
  await dapp.contratMarcheDecentraliseEnvoi.inscription(nom,typeUt);
}

async function ajouterDemande(){
  let desc = document.getElementById("demande_description").value;
  let nomUti = (document.querySelector('#myList option:checked').value).split("|");
  let remu = document.getElementById("demande_remu").value;
  let repMin = document.getElementById("demande_repMin").value;
  await dapp.contratMarcheDecentraliseEnvoi.ajouterDemande(nomUti[1],remu,desc,repMin);
  console.log(nomUti[1]);
}

async function rafraichir() {
  dapp.provider.getNetwork().then(
    ntw => {document.getElementById("network").innerHTML = JSON.stringify(ntw);
    })
  listeUtilisateurs();
}

function rating(value){
  if(value == 0){return `<td>  </td>`}
  else if(value == 1){return `<td> ⭐ </td>`}
  else if (value == 2){return '<td> ⭐⭐ </td>'}
  else if (value == 3){return '<td> ⭐⭐⭐ </td>'}
  else if (value == 4){return '<td> ⭐⭐⭐⭐ </td>'}
  else if (value == 5){return '<td> ⭐⭐⭐⭐⭐ </td>'}
}

async function listeUtilisateurs() { 
  document.getElementById("myList").innerHTML="";
  document.getElementById("myListUtil").innerHTML="";
  let listeUtiLength= await dapp.contratMarcheDecentralise.countUtil();
 
  function greenTick(value){
    if(value == true){return `<td class="center aligned"><i class="large green checkmark icon"></i></td>`}
    else if(value == false){return `<td></td>`}
  }
  
  for (i=0; i< listeUtiLength; i++){
    let utilisateurs= await dapp.contratMarcheDecentralise.getUtilisateursList();
    let utiliDetail = await dapp.contratMarcheDecentralise.getUtilisateurDetail(utilisateurs[i]);
    
    let  listitemUt = document.createElement("option");
    listitemUt.innerHTML = `🐥${utiliDetail}|${utilisateurs[i]}`;

    let  listitemUtili = document.createElement("tr");
    listitemUtili.innerHTML = `<td>${utiliDetail[0]}</td>
    ${rating(utiliDetail[1])}
    ${greenTick(utiliDetail[2])}
    ${greenTick(utiliDetail[3])}`;
    document.getElementById("myListUtil").appendChild(listitemUtili);

    document.getElementById("myList").appendChild(listitemUt);
  }


}

async function listeDemandes() {
  document.getElementById("listeDemandes").innerHTML="";
  let listeDeLength= await dapp.contratMarcheDecentralise.countDemandes();

  function statut(value){
    if(value == 0){return `<td><i class="icon checkmark"></i> Open</td>`}
    else if(value == 1){return `<td><i class="sync alternate icon"></i> In Progress</td>`}
    else if (value == 2){return '<td class="positive"><i class="icon close"></i> Closed</td>'}
  }


  for (i=0; i< listeDeLength; i++){
    
    let demandes= await dapp.contratMarcheDecentralise.getDemandesList();
    let demandeDetail = await dapp.contratMarcheDecentralise.getDemandesDetail(demandes[i]);
    let  listitemDe = document.createElement("tr");
    
    listitemDe.innerHTML = `<td>${demandeDetail[0]}</td>
    <td>${demandeDetail[1]}</td>
    <td>${demandeDetail[2]}</td>
    <td>${demandeDetail[3]}</td>
    <td>${demandeDetail[4]}</td>
    ${statut(demandeDetail[5])}
    ${rating(demandeDetail[6])}
    <td>${demandeDetail[7]}</td>
    <td><button class="ui toggle button" onclick="postuler()">Postuler</button></td>`;
    document.getElementById("listeDemandes").appendChild(listitemDe);

  }
}



async function postuler() {
  let addressCandid = user.address; 
  let IdDemande = 0;
  dapp.contratMarcheDecentraliseEnvoi.postuler(addressCandid,IdDemande);
}


$('.ui.radio.checkbox')
  .checkbox();

$('.ui.dropdown')
  .dropdown();

