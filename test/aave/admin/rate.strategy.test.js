
//getReserveConfigurationData

let EthContract = require("../../../lib/utils/ethContract")
let url = "https://mainnet.infura.io/v3/393758f6317645be8a1ee94a874e12d9"

let daiAddress = '0x6B175474E89094C44Da98b954EedeAC495271d0F' // DAI

let interestRateStrategyAddress = "0x0c212728e3cDb57ED62DdFCa917Fe7DF17A63979"
let interestRateStrategyAddressAbi = require("../abi/admin/DefaultReserveInterestRateStrategy.json")

let ethContract = new EthContract({}, url)
let interestRateStrategyContract = ethContract.contract(interestRateStrategyAddressAbi, interestRateStrategyAddress)


// 获取储备资产的地址
it(" getBaseVariableBorrowRate call", async () => {
    let reserves = await interestRateStrategyContract.methods.getBaseVariableBorrowRate().call()
    console.log(reserves)
})