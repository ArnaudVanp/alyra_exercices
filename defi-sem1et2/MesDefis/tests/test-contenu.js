const Client = require('bitcoin-core');
const client = new Client({ 
  network: 'regtest', 
  username: 'bitcoin', 
  password: 'bitcoin', 
  port: 18443 
});

//client.getBlockchainInfo().then((x) => console.log(x));

//const hashBlock = '634da0187b0f666497c81ea4a90312478dc1ca7a84541c09f62927fce033cd32';

//let source = client.getBlockByHash(hashBlock); 

//client.getBlockByHash(hashBlock).then((x) => console.log(x));

var d = new Date(1556649280*1000);
console.log(d.toDateString());


//getTransactionByHash(hash)

