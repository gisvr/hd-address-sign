let EthContract = require("../../lib/utils/ethContract")

let url = "https://ropsten.infura.io/v3/393758f6317645be8a1ee94a874e12d9"

// mint
let lpAddress = "0xE1B7eb81D06aA3c1DEa15082fa94BA2EBB26DFE7"
let lpAbi = require("./abi/LendingPool.json")


let ethContract = new EthContract({chain: "ropsten"}, url)


// input variables
const daiAddress = '0xd25532602CD97915Ad1EeD45B28167c5be160042' // repost
const daiAmountinWei = ethContract.web3.utils.toWei("10", "gwei")
let interestRateMode = 1 // variable rate
const referralCode = '0'


// 借资产
it("redeemUnderlying send", async () => {
    //borrow(address _reserve, uint256 _amount, uint256 _interestRateMode, uint16 _referralCode)

    let userAddr ="0x9F7A946d935c8Efc7A8329C0d894A69bA241345A"
    let privateKey = "6b3d62de1c55740660693db23917efff49306f4d6616c145d98a4a2d7a740caa"
    let lpContract = ethContract.contract(lpAbi, lpAddress)
    let aDaiAddress = "0xF8dAcF50a51722C7b37F600D924B14Af9382EFC1"
    let redeem = await lpContract.methods.redeemUnderlying(
        aDaiAddress,
        userAddr,
        daiAmountinWei,
        daiAmountinWei
    )
    let txRecepit = await ethContract.contractSend(lpAddress, redeem, privateKey)
    console.log(txRecepit)
})


