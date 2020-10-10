let EthContract = require("../../lib/utils/ethContract")

let url = "https://ropsten.infura.io/v3/393758f6317645be8a1ee94a874e12d9"

let DaiAddress = '0xf80A32A835F79D7787E8a8ee5721D0fEaFd78108' //
let token1 = '0xc778417E063141139Fce010982780140Aa0cD5Ab'  // WETH

// aave

let poolAddress = "0x9E5C7835E4b13368fd628196C4f1c6cEc89673Fa"
let poolAbi = require("./abi/LendingPool.json")

let poolCoreAddress = "0x4295Ee704716950A4dE7438086d6f0FBC0BA9472"
let poolCoreAbi = require("./abi/LendingPool.json")


let ethContract = new EthContract({chain: "ropsten"}, url)
let poolCoreContract = ethContract.contract(poolCoreAbi, poolCoreAddress)
let poolContract = ethContract.contract(poolAbi, poolAddress)

// 获取储备资产的地址
it("aave getReserves call", async () => {
    let reserves = await poolContract.methods.getReserves().call()
    console.log(reserves)
})
// [
//     '0xf80A32A835F79D7787E8a8ee5721D0fEaFd78108',
//     '0xa51EE1845C13Cb03FcA998304b00EcC407fc1F92',
//     '0x851dEf71f0e6A903375C1e536Bd9ff1684BAD802',
//     '0xB404c51BBC10dcBE948077F18a4B8E553D160084',
//     '0xc374eB17f665914c714Ac4cdC8AF3a3474228cc5',
//     '0x217b896620AfF6518B9862160606695607A63442',
//     '0x85B24b3517E3aC7bf72a14516160541A60cFF19d',
//     '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
//     '0x1a906E71FF9e28d8E01460639EB8CF0a6f0e2486',
//     '0xa0E54Ab6AA5f0bf1D62EC3526436F3c05b3348A0',
//     '0xCe4aA1dE3091033Ba74FA2Ad951f6adc5E5cF361',
//     '0xBeb13523503d35F9b3708ca577CdCCAdbFB236bD',
//     '0x2eA9df3bABe04451c9C3B06a2c844587c59d9C37',
//     '0x78b1F763857C8645E46eAdD9540882905ff32Db7',
//     '0x02d7055704EfF050323A2E5ee4ba05DB2A588959',
//     '0xFA6adcFf6A90c11f31Bc9bb59eC0a6efB38381C6',
//     '0xB36938c51c4f67e5E1112eb11916ed70A772bD75',
//     '0xa2EA00Df6d8594DBc76b79beFe22db9043b8896F',
//     '0xB47F338EC1e3857BB188E63569aeBAB036EE67c6'
// ]

// 获取交易对在合约里面对余额
it("aave getReserveData call", async () => {
    let DAIAddress = "0xf80A32A835F79D7787E8a8ee5721D0fEaFd78108"
    let reserves = await poolContract.methods.getReserveData(DAIAddress).call()
    console.log(reserves)
})


