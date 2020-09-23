//0xc778417E063141139Fce010982780140Aa0cD5Ab // WETH
let contractAddress = "0xc778417E063141139Fce010982780140Aa0cD5Ab"

let EthContract = require("../../lib/utils/ethContract")
let contractAbi = require("./abi/wethAbi")

let url = "https://ropsten.infura.io/v3/393758f6317645be8a1ee94a874e12d9"
let ethContract = new EthContract({chain: "ropsten"}, url)

let contract = ethContract.contract(contractAbi, contractAddress)

contract.getPastEvents("Deposit",{
    filter:{},
    fromBlock: 8493483,
    toBlock: 'latest'
},(err,events)=>{
    console.log(events)
})
