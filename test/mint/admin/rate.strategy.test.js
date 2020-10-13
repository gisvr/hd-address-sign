
//getReserveConfigurationData

let EthContract = require("../../../lib/utils/ethContract")

let url = "https://ropsten.infura.io/v3/393758f6317645be8a1ee94a874e12d9"

let interestRateStrategyAddress = "0x34D11a15A0991aC5fe11e5E2D8a3C49B823902DA" //DAI
let interestRateStrategyAddressAbi = require("../abi/admin/DefaultReserveInterestRateStrategy.json")

let ethContract = new EthContract({}, url)
let interestRateStrategyContract = ethContract.contract(interestRateStrategyAddressAbi, interestRateStrategyAddress)


// 获取储备资产的地址
it(" getBaseVariableBorrowRate call", async () => {
    let reserves = await interestRateStrategyContract.methods.getBaseVariableBorrowRate().call()
    console.log(reserves)
})