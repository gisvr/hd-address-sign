let EthContract = require("../../lib/utils/ethContract")

let url = "https://ropsten.infura.io/v3/393758f6317645be8a1ee94a874e12d9"

let privateKey = "05c0f655cde1d2225939c5ef86f37f039ed2a67845a0ca920c854388cb34791c"

// uniswap factory
let contractAddress = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f"
let contractAbi = require("./abi")
let ethContract = new EthContract({chain: "ropsten"}, url)

let contract = ethContract.contract(contractAbi, contractAddress)


//获取合约的交易对
it("uniswap allPairsLength call", async () => {
    let length = await contract.methods.allPairsLength().call()
    console.log(length)
})

//根据index 获取交易对对合约地址
it("uniswap allPairs call", async () => {
    let allPairs = await contract.methods.allPairs(1).call() //0x6E7696d7c16B40188eDc6eeABa7a5F1930f9FAAE
    console.log(allPairs)
})

// 根据 交易对的地址获取交易对 合约地址
it("uniswap getPair call", async () => {
    let token0 = '0x4ADa45DCEF8f1Be195E87c142b3a554B666A4f05'
    let token1 = '0xc778417E063141139Fce010982780140Aa0cD5Ab'
    let pair = await contract.methods.getPair(token0, token1).call()
    console.log(pair) //0xe8ec795CDC80b26c99f322F62aD7f31D99De5BBf
})

it("uniswap feeTo call", async () => {
    let feeTo = await contract.methods.feeTo().call()
    console.log(feeTo)
})

it("uniswap feeToSetter call", async () => {
    let feeToSetter = await contract.methods.feeToSetter().call()
    console.log(feeToSetter)
})


// 创建一个新的资金池合约
//Function: createPair(address tokenA, address tokenB)
it("uniswap createPair send", async () => {

})