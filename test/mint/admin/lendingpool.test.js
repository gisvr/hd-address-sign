let EthContract = require("../../../lib/utils/ethContract")
let url = "https://ropsten.infura.io/v3/393758f6317645be8a1ee94a874e12d9"

let daiAddress = '0xd25532602CD97915Ad1EeD45B28167c5be160042' //DAI
let batAddress = '0x11333dd4c35e89E06a785b925CaB5D97A69576C6'  // BAT

let lpAddress = "0xE1B7eb81D06aA3c1DEa15082fa94BA2EBB26DFE7"
let lpAbi = require("../abi/LendingPool.json")

let ethContract = new EthContract({}, url)
let lpContract = ethContract.contract(lpAbi, lpAddress)

// 获取储备资产的地址
it("getReserves call", async () => {
    let reserves = await lpContract.methods.getReserves().call()
    console.log(reserves)
})


it("getReserveConfigurationData BAT", async () => {
    let reservesConf = await lpContract.methods.getReserveConfigurationData(batAddress).call()
    console.log(reservesConf)

    //interestRateStrategyAddress  0x02f005A02Cf2FDCFa10f24461f259464f1419250
})

it("getReserveConfigurationData DAI", async () => {
    let reservesConf = await lpContract.methods.getReserveConfigurationData(daiAddress).call()
    console.log(reservesConf)
    console.log(reservesConf.interestRateStrategyAddress)
    /*
        ltv: '75',
        liquidationThreshold: '80',
        liquidationBonus: '105',
        interestRateStrategyAddress: '0x34D11a15A0991aC5fe11e5E2D8a3C49B823902DA',
        usageAsCollateralEnabled: true,
        borrowingEnabled: true,
        stableBorrowRateEnabled: true,
        isActive: true
    */
})