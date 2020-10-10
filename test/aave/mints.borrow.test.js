let EthContract = require("../../lib/utils/ethContract")

let url = "https://ropsten.infura.io/v3/393758f6317645be8a1ee94a874e12d9"

// mint
let lpAddress = "0xE1B7eb81D06aA3c1DEa15082fa94BA2EBB26DFE7"
let lpAbi = require("./abi/LendingPool.json")


let ethContract = new EthContract({chain: "ropsten"}, url)


// input variables
const daiAddress = '0xd25532602CD97915Ad1EeD45B28167c5be160042' // repost
const daiAmountinWei = ethContract.web3.utils.toWei("2000", "gwei")
const interestRateMode = 1 // variable rate
const referralCode = '0'


// 借资产
it("mint borrow send", async () => {
    //borrow(address _reserve, uint256 _amount, uint256 _interestRateMode, uint16 _referralCode)

    // let userAddr ="0x9F7A946d935c8Efc7A8329C0d894A69bA241345A"
    let privateKey = "6b3d62de1c55740660693db23917efff49306f4d6616c145d98a4a2d7a740caa"
    let lpContract = ethContract.contract(lpAbi, lpAddress)
    let borrow = await lpContract.methods.borrow(
        daiAddress,
        daiAmountinWei,
        interestRateMode,
        referralCode
    )

    let txRecepit = await ethContract.contractSend(lpAddress, borrow, privateKey)
    console.log(txRecepit)
    // https://ropsten.etherscan.io/tx/0xa98afc7ac62e9cc3e8eced0457ab12a751f4673d0b5231500bb2399547a2502b#internal
})


// 切换利率模型
it("mint swapBorrowRateMode send", async () => {
    //borrow(address _reserve, uint256 _amount, uint256 _interestRateMode, uint16 _referralCode)

    // let userAddr ="0x9F7A946d935c8Efc7A8329C0d894A69bA241345A"
    let privateKey = "6b3d62de1c55740660693db23917efff49306f4d6616c145d98a4a2d7a740caa"
    let lpContract = ethContract.contract(lpAbi, lpAddress)
    let borrow = await lpContract.methods.swapBorrowRateMode(daiAddress)

    let txRecepit = await ethContract.contractSend(lpAddress, borrow, privateKey)
    console.log(txRecepit)
})

