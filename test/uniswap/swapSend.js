let EthContract = require("../../lib/utils/ethContract")

let url = "https://ropsten.infura.io/v3/393758f6317645be8a1ee94a874e12d9"

let token0 = '0x4ADa45DCEF8f1Be195E87c142b3a554B666A4f05' // KIWI
let token1 = '0xc778417E063141139Fce010982780140Aa0cD5Ab'  // WETH
// uniswap
let contractAddress = "0xe8ec795CDC80b26c99f322F62aD7f31D99De5BBf"
let contractAbi = require("./swapAbi")
let ethContract = new EthContract({chain: "ropsten"}, url)

let contract = ethContract.contract(contractAbi, contractAddress)

//https://ropsten.etherscan.io/tx/0x4a6d908cdf395a463ac30f24d570e765d44b72cbec75f19d38d3ff466dcb6ead
//addLiquidityETH(address token, uint256 amountTokenDesired, uint256 amountTokenMin, uint256 amountETHMin, address to, uint256 deadline)
it("uniswap addLiquidityETH send", async () => {
    let reserves = await contract.methods.getReserves().call()
    console.log(reserves)
})

it("uniswap initialize send", async () => {
    // called once by the factory at time of deployment
    // 只能调用一次，在合约部署的时候。 代码里面指定了sender 是创建合约的地址。 其他调用无法执行。
})

