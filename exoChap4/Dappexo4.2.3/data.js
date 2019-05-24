let contractAddress = "0x6386a77719d48a62c1e9b3601750b8f779d5f4a8"
let contractABI =[
	{
		"constant": false,
		"inputs": [
			{
				"name": "_url",
				"type": "string"
			}
		],
		"name": "remettre",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "destinataire",
				"type": "address"
			},
			{
				"name": "_valeur",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "expediteur",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "expedSha",
				"type": "bytes32"
			}
		],
		"name": "Remettre",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "classement",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "cred",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]