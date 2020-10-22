let EthContract = require("../../lib/utils/ethContract")

let url = "https://ropsten.infura.io/v3/393758f6317645be8a1ee94a874e12d9"

// mint
let lpCoreAddress = "0xCaec37116D4626CcC378A897B01a0F93f379583E"

let lpAddress = "0xE1B7eb81D06aA3c1DEa15082fa94BA2EBB26DFE7"
let lpAbi = require("./abi/LendingPool.json")

let ethContract = new EthContract({chain: "ropsten"}, url)

// input variables
const daiAddress = '0xF8dAcF50a51722C7b37F600D924B14Af9382EFC1' // repost
const wbtcAddress = "0x7764CE5Af6121d29b45bb0BdCbaa5f569c20d545"

let aTokneAddress = daiAddress
let aTokenABI = require("./abi/AToken.json")

const daiAmountinWei = ethContract.web3.utils.toWei("50000", "gwei")

// 赎回资产
it("redeem send", async () => {

    let aTokenContract = ethContract.contract(aTokenABI, aTokneAddress)

    const amountInWei = ethContract.web3.utils.toWei("20", "ether")
    // function redeem(uint256 _amount)
    let redeem = await aTokenContract.methods.redeem(amountInWei)

    // let userAddr ="0x9F7A946d935c8Efc7A8329C0d894A69bA241345A"
    let privateKey = "6b3d62de1c55740660693db23917efff49306f4d6616c145d98a4a2d7a740caa"

    //执行合约
    let txRecepit = await ethContract.contractSend(aTokneAddress, redeem, privateKey)
    console.log(txRecepit)
    // https://ropsten.etherscan.io/tx/0xd0b08a556b7e40b9badcfd49c42b061534b32ebb1d631ea3c40dae734d8a07e8
})