/* Générer une adresse bitcoin */
/* exemple de clé publique d'entrée: 02f5e25778dcee9539b25799831277eb8e731ffcbdcd9e68f79f8ca43c570b94ba */
const sha256 = require('crypto-js/sha256');
const ripemd160 = require ('crypto-js/ripemd160');
const bs58 = require ('bs58');

function genererAdresseBitcoin(clePub){

    let adresseCondensat = "";
    let adresseControl = "";
    
    adresseCondensat = ripemd160(sha256(clePub)).toString();//double hash HASH160(SHA256 puis RIPEMD160 de la clé d'entrée)

    if (process.argv[3]=="principal"){  // ajout de l'identifiant argmt <principal> => adresse du réseau principal identifiant 0x00, sinon testnet 0x6f
        adresseCondensat = ('0x00' +adresseCondensat).toString();
    } else { adresseCondensat = ( '0x6F' +adresseCondensat).toString();}

    adresseControl = sha256(sha256(adresseCondensat)).toString().slice(0,8); // double sha256 du condensat incluant sont prefix et isole les 4 premiers octets de l'adresse (8 caracteres: 32bits)
 
    adresseCondensat = adresseCondensat+adresseControl; // ajoute les 4 octets de contrôle à la fin de l'adresse

    const bsBuffer = Buffer.from(adresseCondensat);//conversion en base58.
    const adresseBtc = bs58.encode(bsBuffer);
    
    //const decode = bs58.decode(''); // test de décodage depuis base58.
    //var bufftemp = new Buffer(decode);
    //var buff = (bufftemp.toString('utf8'));

    return adresseBtc;

}

let adresseBitcoin = genererAdresseBitcoin(process.argv[2]);
console.log(adresseBitcoin);


