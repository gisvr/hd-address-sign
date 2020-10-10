let EthContract = require("../../lib/utils/ethContract")

let url = "https://mainnet.infura.io/v3/393758f6317645be8a1ee94a874e12d9"

let daiAddress = '0x6B175474E89094C44Da98b954EedeAC495271d0F' //

// aave
let poolAddress = "0x398eC7346DcD622eDc5ae82352F02bE94C62d119"
let poolAbi = require("./abi/LendingPool.json")



let ethContract = new EthContract({chain: "ropsten"}, url)
let poolContract = ethContract.contract(poolAbi, poolAddress)

// 获取储备资产的地址
// https://docs.aave.com/developers/deployed-contracts/deployed-contract-instances
it("aave getReserves call", async () => {
    let reserves = await poolContract.methods.getReserves().call()
    console.log(reserves)
})


// 获取交易对在合约里面对余额
it("aave getReserveData call", async () => {
    let reserves = await poolContract.methods.getReserveData(daiAddress).call()
    console.log(reserves)
})

// dai
// totalLiquidity: '24952755302097838908751613',
//     availableLiquidity: '10841144507241300268568906',
//     totalBorrowsStable: '4419607644536026703532059',
//     totalBorrowsVariable: '9692003150320511936650648',
//     liquidityRate: '36093291347737667505554849',
//     variableBorrowRate: '59484152335118573093240053',
//     stableBorrowRate: '77414987715815919794205760',
//     averageStableBorrowRate: '73333766544186887723342576',
//     utilizationRate: '565533169544212263922743466',
//     liquidityIndex: '1061873051630518275743007844',
//     variableBorrowIndex: '1058529905303797527809706208',
//     aTokenAddress: '0xfC1E690f61EFd961294b3e1Ce3313fBD8aa4f85d',
//     lastUpdateTimestamp: '1602334688'


