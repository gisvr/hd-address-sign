//0xc778417E063141139Fce010982780140Aa0cD5Ab // WETH
let contractAddress = "0xc778417E063141139Fce010982780140Aa0cD5Ab"

let EthContract = require("../../lib/utils/ethContract")
let contractAbi = require("./abi/wethAbi")

let url = "https://ropsten.infura.io/v3/393758f6317645be8a1ee94a874e12d9"
let ethContract = new EthContract({chain: "ropsten"}, url)

let contract = ethContract.contract(contractAbi, contractAddress)

it("uniswap balanceOf call", async () => {
    let reserves = await contract.methods.balanceOf("0x57999E73151bfce1527E68517933a1e1DE34CfeE").call()
    console.log(reserves)
})

it("uniswap getReserves call", async () => {
    let reserves = await contract.methods.withdraw().send()
    console.log(reserves)
})