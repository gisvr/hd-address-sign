let EthContract = require("../../lib/utils/ethContract")

let url = "https://ropsten.infura.io/v3/393758f6317645be8a1ee94a874e12d9"

// proxyContract.methods.getLendingPoolConfigurator()
let lpConfAddress = "0x179Aa6f2b5a8CdC6a65A35B22fAdC492e05fA264"

// input variables
const daiAddress = '0xd25532602CD97915Ad1EeD45B28167c5be160042' // repost

let lpConfAbi = require("./abi/admin/LendingPoolConfigurator.json")
let ethContract = new EthContract({chain: "ropsten"}, url)

// LendingPoolCore imp proxy
// 参考方法 https://etherscan.io/address/0x3dfd23A6c5E8BbcFc9581d2E864a68feb6a076d3#writeProxyContract

// LendingPoolCore imp 方法具体实现定义
// https://etherscan.io/address/0x5766067108e534419ce13f05899bc3e3f4344948#writeContract


// 以上 Manage 只能通过 LendingPoolConfigurator 合约进行操作
// https://etherscan.io/address/0x4965f6fa20fe9728decf5165016fc338a5a85abf#writeContract

// https://eips.ethereum.org/EIPS/eip-1967 的代理模式操作

// 用户是否允许固定利率借贷
it("isUserAllowedToBorrowAtStable call", async () => {
    // address ="0x2E9D15d024187477F85Ac7cD7154aD8556EDb8E2"
    let privateKey = "76d099613fc3e386db8afd16679e33de6a16c757427b7b6ab3a2eed4a864f45d"
    let contract = ethContract.contract(lpConfAbi, lpConfAddress)
    let setStableRate = await contract.methods.isUserAllowedToBorrowAtStable(daiAddress)

    let txRecepit = await ethContract.contractSend(lpConfAddress, setStableRate, privateKey)
    console.log(txRecepit)

    //https://ropsten.etherscan.io/tx/0xbd46a600d4616fefc4b3bfd6a5ea4587ea57c9fe9b62313ee0171b3226140219
    // Fail with error 'User cannot borrow the selected amount with a stable rate™vP'
    // 需要去调整固定利率
})



// 开启固定利率 只能通过config 合约进行调用
it("enableReserveStableBorrowRate send", async () => {
    // address ="0x2E9D15d024187477F85Ac7cD7154aD8556EDb8E2"
    let privateKey = "76d099613fc3e386db8afd16679e33de6a16c757427b7b6ab3a2eed4a864f45d"
    let contract = ethContract.contract(lpConfAbi, lpConfAddress)
    let setStableRate = await contract.methods.enableReserveStableBorrowRate(daiAddress)

    let txRecepit = await ethContract.contractSend(lpConfAddress, setStableRate, privateKey)
    console.log(txRecepit)

    //https://ropsten.etherscan.io/tx/0xbd46a600d4616fefc4b3bfd6a5ea4587ea57c9fe9b62313ee0171b3226140219
    // Fail with error 'User cannot borrow the selected amount with a stable rate™vP'
    // 需要去调整固定利率
})

it("config send", async () => {
    // address ="0x2E9D15d024187477F85Ac7cD7154aD8556EDb8E2"
    let privateKey = "76d099613fc3e386db8afd16679e33de6a16c757427b7b6ab3a2eed4a864f45d"
    let contract = ethContract.contract(lpConfAbi, lpConfAddress)
    let setStableRate = await contract.methods.enableReserveStableBorrowRate(daiAddress)

    let txRecepit = await ethContract.contractSend(lpConfAddress, setStableRate, privateKey)
    console.log(txRecepit)

    //https://ropsten.etherscan.io/tx/0xbd46a600d4616fefc4b3bfd6a5ea4587ea57c9fe9b62313ee0171b3226140219
    // Fail with error 'User cannot borrow the selected amount with a stable rate™vP'
    // 需要去调整固定利率
})



 

