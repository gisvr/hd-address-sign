let EthContract = require("../../lib/utils/ethContract")

let url = "https://ropsten.infura.io/v3/393758f6317645be8a1ee94a874e12d9"

// mint
let lpCoreAddress = "0xCaec37116D4626CcC378A897B01a0F93f379583E"

let lpAddress = "0xE1B7eb81D06aA3c1DEa15082fa94BA2EBB26DFE7"
let lpAbi = require("./abi/LendingPool.json")

let ethContract = new EthContract({chain: "ropsten"}, url)


// input variables
const daiAddress = '0xd25532602CD97915Ad1EeD45B28167c5be160042' // repost
let DaiTokenABI = require("./abi/token/Dai.json")

const daiAmountinWei = ethContract.web3.utils.toWei("50000", "gwei")

// 预授权资产
it("Dai approve send", async () => {
    // let userAddr ="0x9F7A946d935c8Efc7A8329C0d894A69bA241345A"
    let privateKey = "6b3d62de1c55740660693db23917efff49306f4d6616c145d98a4a2d7a740caa"
    let daiContract = ethContract.contract(DaiTokenABI, daiAddress)
    let repay = await daiContract.methods.approve(
        lpCoreAddress,
        daiAmountinWei
    )

    let txRecepit = await ethContract.contractSend(daiAddress, repay, privateKey)
    console.log(txRecepit)
    // https://ropsten.etherscan.io/tx/0xa98afc7ac62e9cc3e8eced0457ab12a751f4673d0b5231500bb2399547a2502b#internal
})

// 还资产
it("repay send", async () => {
    let userAddr ="0x9F7A946d935c8Efc7A8329C0d894A69bA241345A"
    let lpContract = ethContract.contract(lpAbi, lpAddress)
    let daiAddr = '0xd25532602CD97915Ad1EeD45B28167c5be160042' // repost
    const repayDaiAmountinWei = ethContract.web3.utils.toWei("20", "gwei")
    // function repay( address _reserve, uint256 _amount, address payable _onBehalfOf)
    let repay = await lpContract.methods.repay(
        daiAddr,
        repayDaiAmountinWei,
        userAddr
    )

    let privateKey = "6b3d62de1c55740660693db23917efff49306f4d6616c145d98a4a2d7a740caa"
    let txRecepit = await ethContract.contractSend(lpAddress, repay, privateKey)
    console.log(txRecepit)
    // https://ropsten.etherscan.io/tx/0x736606b9862197ab29caa97fb6ff4bb5e264d99c99a66d7c3f33371d4640357d
})

