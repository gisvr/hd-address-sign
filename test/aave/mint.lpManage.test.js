let EthContract = require("../../lib/utils/ethContract")

let url = "https://ropsten.infura.io/v3/393758f6317645be8a1ee94a874e12d9"

// aave mainnet // "0x24a42fD28C976A61Df5D00D0599C34c4f90748c8"
// repsent  "0x1c8756FD2B28e9426CDBDcC7E3c4d64fa9A54728"
let aaveAddress = "0x1c8756FD2B28e9426CDBDcC7E3c4d64fa9A54728";

// mint
let lpCoreAddress = "0xCaec37116D4626CcC378A897B01a0F93f379583E"

// input variables
const daiAddress = '0xd25532602CD97915Ad1EeD45B28167c5be160042' // repost

let lpCoreAbi = require("./abi/LendingPoolCore.json")
let ethContract = new EthContract({chain: "ropsten"}, url)

// LendingPoolCore imp proxy
// 参考方法 https://etherscan.io/address/0x3dfd23A6c5E8BbcFc9581d2E864a68feb6a076d3#writeProxyContract

// LendingPoolCore imp 方法具体实现定义
// https://etherscan.io/address/0x5766067108e534419ce13f05899bc3e3f4344948#writeContract


// 以上 Manage 只能通过 LendingPoolConfigurator 合约进行操作
// https://etherscan.io/address/0x4965f6fa20fe9728decf5165016fc338a5a85abf#writeContract

// https://eips.ethereum.org/EIPS/eip-1967 的代理模式操作

// 开启固定利率 // 错误提示只能通过config合约操作改方法
it("enableReserveStableBorrowRate send", async () => {
    // address ="0x2E9D15d024187477F85Ac7cD7154aD8556EDb8E2"
    let privateKey = "76d099613fc3e386db8afd16679e33de6a16c757427b7b6ab3a2eed4a864f45d"
    let contract = ethContract.contract(lpCoreAbi, lpCoreAddress)
    let setStableRate = await contract.methods.enableReserveStableBorrowRate(daiAddress)

    let txRecepit = await ethContract.contractSend(lpCoreAddress, setStableRate, privateKey)
    console.log(txRecepit)

    // 0xb6f74d45f4da9cfe9b733e8f7a906d3a7f37e868dfb4d4c11c0989ece7432392
    // The caller must be a lending pool configurator contract
})

// enableReserveStableBorrowRate


 

