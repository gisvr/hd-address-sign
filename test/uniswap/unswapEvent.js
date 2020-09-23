let EthContract = require("../../lib/utils/ethContract")

let url = "https://ropsten.infura.io/v3/393758f6317645be8a1ee94a874e12d9"


// uniswap
let contractAddress = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f"
let contractAbi = require("./abi/swapFactoryAbi")
let ethContract = new EthContract({chain: "ropsten"}, url)

// uniswap 创建出的合约
// 0x6E7696d7c16B40188eDc6eeABa7a5F1930f9FAAE
let contract = ethContract.contract(contractAbi, contractAddress)

contract.getPastEvents("PairCreated",{
    filter:{},
    fromBlock: 8493483,
    toBlock: 'latest'
},(err,events)=>{
    console.log(events)
})

let token0 = '0x4ADa45DCEF8f1Be195E87c142b3a554B666A4f05'
let token1 = '0xc778417E063141139Fce010982780140Aa0cD5Ab'
let pair = '0xe8ec795CDC80b26c99f322F62aD7f31D99De5BBf'

//  let pairCreatedEvent = contract.events.PairCreated(token0, token1, pair)
// console.log(pairCreatedEvent)
// if (pairCreatedEvent) {
//     pairCreatedEvent.watch((err, res) => {
//         if (err) {
//             console.log(err)
//         } else {
//             console.log(res)
//         }
//     })
// }
