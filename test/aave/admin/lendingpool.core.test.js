
//getReserveConfigurationData

let EthContract = require("../../lib/utils/ethContract")
let url = "https://mainnet.infura.io/v3/393758f6317645be8a1ee94a874e12d9"

let daiAddress = '0x6b175474e89094c44da98b954eedeac495271d0f' // DAI

let lpAddress = "0x398ec7346dcd622edc5ae82352f02be94c62d119"
let lpAbi = require("./abi/LendingPool.json")

let lpCoreAddress = "0x3dfd23A6c5E8BbcFc9581d2E864a68feb6a076d3"
let lpCoreAbi = require("./abi/LendingPool.json")


let ethContract = new EthContract({}, url)
let poolCoreContract = ethContract.contract(poolCoreAbi, poolCoreAddress)
let poolContract = ethContract.contract(poolAbi, poolAddress)

// 获取储备资产的地址
it("aave getReserves call", async () => {
    let reserves = await poolContract.methods.getReserves().call()
    console.log(reserves)
})


// 获取交易对在合约里面对余额
it("aave getReserveData call", async () => {
    let DAIAddress = "0xf80A32A835F79D7787E8a8ee5721D0fEaFd78108"
    let reserves = await poolContract.methods.getReserveData(DAIAddress).call()
    console.log(reserves)
})