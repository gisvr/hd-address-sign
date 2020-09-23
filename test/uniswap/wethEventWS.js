//0xc778417E063141139Fce010982780140Aa0cD5Ab // WETH
let contractAddress = "0xc778417E063141139Fce010982780140Aa0cD5Ab"

let EthContract = require("../../lib/utils/ethContract")
let contractAbi = require("./abi/wethAbi")

var Web3 = require('web3')
var ws_provider = 'wss://ropsten.infura.io/ws/v3/393758f6317645be8a1ee94a874e12d9'
var web3 = new Web3(new Web3.providers.WebsocketProvider(ws_provider))

let url = "https://ropsten.infura.io/v3/393758f6317645be8a1ee94a874e12d9"

let contract =  new  web3.eth.Contract(contractAbi, contractAddress)

let fromBlock = 8502018
contract.events.Deposit({
    filter: {},
    fromBlock: fromBlock,
}, function (error, event) {
    // console.log(event)
}).on('data', function (event) {
    console.log(event.blockNumber,new Date())
    console.log(event); // same results as the optional callback above
}).on('changed', function (event) {
    console.log(event)
    // remove event from local database
}).on('error', console.error);