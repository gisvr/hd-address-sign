let EthContract = require("../../lib/utils/ethContract")

let url = "https://ropsten.infura.io/v3/393758f6317645be8a1ee94a874e12d9"

let daiAddress = '0xd25532602CD97915Ad1EeD45B28167c5be160042' //
let BatAddress = '0x11333dd4c35e89E06a785b925CaB5D97A69576C6'  // WETH

// mint

let poolAddress = "0xE1B7eb81D06aA3c1DEa15082fa94BA2EBB26DFE7"
let poolAbi = require("./abi/LendingPool.json")

let ethContract = new EthContract({chain: "ropsten"}, url)
let poolContract = ethContract.contract(poolAbi, poolAddress)

// 获取储备资产的地址
it("aave getReserves call", async () => {
    let reserves = await poolContract.methods.getReserves().call()
    console.log(reserves)
})


//     totalLiquidity: '1420000000000000001000', // 总流动资金
//     availableLiquidity: '1419998999900000001000', // 可用借款流动性
//     totalBorrowsStable: '1000000000000000', // 固定利率的未偿还借款总额
//     totalBorrowsVariable: '100000000000', // 浮动利率的未偿还借款总额
//     liquidityRate: '24647887323943661954', // 存款人当前存款 APY(年化利率) Ray(27) 单位
//     variableBorrowRate: '1', // 可变了利率池的年利率
//     stableBorrowRate: '35000000000000000000000000', // 当前稳定借贷利率池
//     averageStableBorrowRate: '35000000000000000000000000', // 当前平均稳定借贷利率
//     utilizationRate: '704295774647887323448',  //  借贷总额/流动性总额 -- 利用率
//     liquidityIndex: '1000000546985838288412638152', // 累积流动性指数
//     variableBorrowIndex: '1000000000000000000000000000', //可变借贷指数
//     aTokenAddress: '0xF8dAcF50a51722C7b37F600D924B14Af9382EFC1',
//     lastUpdateTimestamp: '1602327085' //timestamp
// 获取储备资产信息
it("mint getReserveData call", async () => {
    let reserves = await poolContract.methods.getReserveData(daiAddress).call()
    console.log(reserves)
})


// 获取用户储备资产信息
it("mint getUserReserveData call", async () => {
    let reserves = await poolContract.methods.getUserReserveData(daiAddress,"0x9F7A946d935c8Efc7A8329C0d894A69bA241345A").call()
    console.log(reserves)
})
