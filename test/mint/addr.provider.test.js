let EthContract = require("../../lib/utils/ethContract")

let url = "https://ropsten.infura.io/v3/393758f6317645be8a1ee94a874e12d9"


// mint
let mintAddress = "0x58c360e4E1544cf9f6AA7cF75402B3E93620AcdA"

let providerAbi = require("./abi/LendingPoolAddressesProvider.json")
let ethContract = new EthContract({chain: "ropsten"}, url)

let proxyContract = ethContract.contract(providerAbi, mintAddress)

//方法参考 https://etherscan.io/address/0x24a42fD28C976A61Df5D00D0599C34c4f90748c8#readContract

// 获取getLendingPool的代理地址
it("getLendingPool call", async () => {
    let reserves = await proxyContract.methods.getLendingPool().call()
    console.log(reserves)
})

it("getLendingPoolCore call", async () => {
    let reserves = await proxyContract.methods.getLendingPoolCore().call()
    console.log(reserves)
})

it("getLendingPoolManager call", async () => {
    let reserves = await proxyContract.methods.getLendingPoolManager().call()
    console.log(reserves)
})

// onlyLendingPoolConfigurator
// 4. getLendingPoolConfigurator
//setLendingPoolConfiguratorImpl
it("getLendingPoolConfigurator call", async () => {
    let reserves = await proxyContract.methods.getLendingPoolConfigurator().call()
    console.log(reserves)
})

it("getLendingPoolConfigurator call", async () => {
    let reserves = await proxyContract.methods.getLendingPoolConfigurator().call()
    console.log(reserves)
})

0x6b175474e89094c44da98b954eedeac495271d0f

