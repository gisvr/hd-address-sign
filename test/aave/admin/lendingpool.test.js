let EthContract = require("../../../lib/utils/ethContract")
let url = "https://mainnet.infura.io/v3/393758f6317645be8a1ee94a874e12d9"

let daiAddress = '0x6B175474E89094C44Da98b954EedeAC495271d0F' // DAI

let lpAddress = "0x398ec7346dcd622edc5ae82352f02be94c62d119"
let lpAbi = require("../abi/LendingPool.json")

let ethContract = new EthContract({}, url)
let lpContract = ethContract.contract(lpAbi, lpAddress)

// 获取储备资产的地址
it("getReserves call", async () => {
    let reserves = await lpContract.methods.getReserves().call()
    console.log(reserves)
})

it("getReserveConfigurationData DAI", async () => {
    let reservesConf = await lpContract.methods.getReserveConfigurationData(daiAddress).call()
    console.log(reservesConf)
    console.log(reservesConf.interestRateStrategyAddress)
    /*
        ltv = "75"
        liquidationThreshold = "80"
        liquidationBonus = "105"
        interestRateStrategyAddress = "0x0c212728e3cDb57ED62DdFCa917Fe7DF17A63979"
        usageAsCollateralEnabled = true
        borrowingEnabled = true
        stableBorrowRateEnabled = true
        isActive = true
    */
})

// 获取交易对在合约里面对余额
it("getReserveData DAI", async () => {
    let reserves = await lpContract.methods.getReserveData(daiAddress).call()
    console.log(reserves)
    /**
     totalLiquidity: '24851341199524404886355889',
     availableLiquidity: '8131345146657576669310653',
     totalBorrowsStable: '3929808213017128809475237',
     totalBorrowsVariable: '12790187839849699407569999',
     liquidityRate: '47141902336705640262310932',
     variableBorrowRate: '68870048215097774129894924',
     stableBorrowRate: '85460041327226663539909935',
     averageStableBorrowRate: '73967641878979315991115278',
     utilizationRate: '672800551029688847198799128',
     liquidityIndex: '1062142053825970923893931559',
     variableBorrowIndex: '1058927363318441999662123194',
     aTokenAddress: '0xfC1E690f61EFd961294b3e1Ce3313fBD8aa4f85d',
     lastUpdateTimestamp: '1602512112'
     **/
})