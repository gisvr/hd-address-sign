let EthContract = require("../../lib/utils/ethContract")

let url = "https://ropsten.infura.io/v3/393758f6317645be8a1ee94a874e12d9"

let token0 = '0x4ADa45DCEF8f1Be195E87c142b3a554B666A4f05' // KIWI
let token1 = '0xc778417E063141139Fce010982780140Aa0cD5Ab'  // WETH
// uniswap
let contractAddress = "0xe8ec795CDC80b26c99f322F62aD7f31D99De5BBf"
let contractAbi = require("./swapAbi")
let ethContract = new EthContract({chain: "ropsten"}, url)

let contract = ethContract.contract(contractAbi, contractAddress)

// 获取交易对在合约里面对余额
it("uniswap getReserves call", async () => {
    let reserves = await contract.methods.getReserves().call()
    console.log(reserves)
})

it("uniswap balanceOf call", async () => {
    let addr = "0x20b5f69d108dfc446f64e7393ff4ffd5130ed268"
    let balance = await contract.methods.balanceOf(addr).call()
    console.log(balance)
})
