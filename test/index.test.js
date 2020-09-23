let signAddress = require("../index")
let hdAddress = require("hd-address")

const Web3 = require("web3")
const web3 = new Web3()
//proxy: "https://web3.token.im",
// HQK3Y9C1HHY13ZGNBNXR5MC15UV4WT6QCA

let ethAddress = hdAddress.HD().ETH
let msg = 'today is 20171026'
let {pub, pri} = ethAddress.getCoinKeyPair(1)
// let url = "https://ropsten.infura.io/DvTaqzNZpFvErBoHkvwL"
let url = "https://ropsten.infura.io/v3/393758f6317645be8a1ee94a874e12d9"

//https://github.com/ethereum/web3.js/issues/1040
// Q:sendRawTransaction后接口报错’invalid sender’
// A: 这个报错是以太坊环境错误导致的,代码上表现为chainId没对应.
// 签名需要制定环境chainId,若使用不带chainId的方法,则默认是主网.
let ethSign = signAddress.ETH({chain: "ropsten"}, url)

describe("address sign", () => {
    it("eth sign tx", () => {
        let tx = {
            to: '0x0000000000000000000000000000000000000000',
            value: web3.utils.toHex(0),
            data: '0x0',
            gas: 21006,
        }
        let {pri, path} = ethAddress.getCoinKeyPair(1)
        console.log(pri.toString("hex"))
        let {address} = ethAddress.getAddressByPrivateKey(pri)
        console.log(address, path)
        tx.from = address

        // Buffer.from(privateKey, 'hex')
        let txSignature = ethSign.signTx(tx, pri)
        console.log(txSignature)
    })

    it("eth tx send eth", async () => {
        // let wei = web3.utils.unitMap.gwei
        let gasPriceGWei = web3.utils.toWei("10", "gwei")
        let gasPriceHex = web3.utils.toHex(gasPriceGWei)
        let gasLimitHex = web3.utils.toHex(26384)
        let ethWei = 1000
        let ethWeiHex = web3.utils.toHex(ethWei) // wei

        let tx = {
            gasPrice: gasPriceHex,// '0x09184e72a000': 10,000 Gwei)
            gas: 22000, //26,384
            to: '0x36B1a29E0bbD47dFe9dcf7380F276e86da90c4c2',
            value: ethWei,  //data 是 ETH 中的 input(message) ERC20 的交易这里 data 有不同的含义
        }
        let privateKey = "05c0f655cde1d2225939c5ef86f37f039ed2a67845a0ca920c854388cb34791c"
        let address = "0xbABF7bac084bB3Fbdfec5C823a16100FeCa69a96"
        let nonce = await ethSign.web3.eth.getTransactionCount(address)
        // tx.from = address// 可以不传 会通过私钥添加
        tx.nonce = nonce
        let txSignature = ethSign.signTx(tx, Buffer.from(privateKey, 'hex'))
        console.log(txSignature.transactionHash)

        console.log(txSignature.rawTransaction)
        // let addr = web3.eth.accounts.recoverTransaction(txSignature.rawTransaction)

        console.assert(address == addr)

        // send 0xc537221b9897be22db86d43d5e78169133a090544c5deaefd698b0470c4d8f3b
        let txid = await ethSign.sendTx(txSignature.rawTransaction).catch(e => {
            console.log(e)
        })
        console.log(txid)
    })

    // data 字段 ERC20 是有规定的，因为是要调用合约方法，
    // 根据规定需要获取 transfer 方法的16进制前部分，这个ERC20标准规定的，
    // 所有合约TRANSFER_METHOD_ID都是固定的,包括目标地址的补 0 ，按顺序拼接到一起。
    it("eth tx send erc20", async () => {

    })

    // https://segmentfault.com/a/1190000017396711
    it("get mether code ", () => {
        let code = web3.utils.sha3('transfer(address,uint256)')
        console.log(code.substr(0, 10))

    })

    it("get eth decode ", () => {
       let foo =   web3.eth.accounts.recoverTransaction( "0xf8650a8502540be4008255f09436b1a29e0bbd47dfe9dcf7380f276e86da90c4c28203e88029a0323d03e6837e02f67840e41d335a1540e1434faaa0aa1a3b925e5968eed6fd609fc86561dc64dd9894b2a640a9eaa375c4cecd28d5501ffa54d4439ffca45d6a")
       // let foo =   web3.eth.accounts.recoverTransaction('0xf86180808401ef364594f0109fc8df283027b6285cc889f5aa624eac1f5580801ca031573280d608f75137e33fc14655f097867d691d5c4c44ebe5ae186070ac3d5ea0524410802cdc025034daefcdfa08e7d2ee3f0b9d9ae184b2001fe0aff07603d9');
        console.log(foo)
    })

    it("eth sign msg", () => {
        let msgSignature = ethSign.signMsg(msg, pri)
        let ethObj = ethAddress.getAddressByPrivateKey(pri)
        console.log(ethObj.address)
        let pubkey = ethSign.verfiySignMsg(msgSignature, msg)
        let {address} = ethAddress.getAddressByPublicKey(pubkey)
        console.log(address)
    })
    // https://danfinlay.github.io/js-eth-personal-sign-examples/
    // https://github.com/danfinlay/js-eth-personal-sign-examples
    it("eth verfiy msg sign", async () => {
        let txSignature = "0xaad82b874b7858ad41a04e887863b9a6b7f8b252d5a1d3428a8b388e11a433437a4637f25c9edc0b7379c966b3d4ff6253131ab63835b72401da7f5ca909ceb51b"
        let msg = "0x879a053d4800c6354e76c7985a865d2922c82fb5b3f4577b2fe08b998954f2e0"
        let pubkey = ethSign.verfiySignMsg(txSignature, msg)
        console.log("0x7b8db3850f104Ae8C6Cb1B3eb524e2c39115598A")
        let {address} = ethAddress.getAddressByPublicKey(pubkey)
        console.log(address)
    })

})


// Define Properties
let fields = [
    {
        name: 'nonce',
        length: 32,
        allowLess: true,
        default: Buffer.from([]),
    },
    {
        name: 'gasPrice',
        length: 32,
        allowLess: true,
        default: Buffer.from([]),
    },
    {
        name: 'gasLimit',
        alias: 'gas',
        length: 32,
        allowLess: true,
        default: Buffer.from([]),
    },
    {
        name: 'to',
        allowZero: true,
        length: 20,
        default: Buffer.from([]),
    },
    {
        name: 'value',
        length: 32,
        allowLess: true,
        default: Buffer.from([]),
    },
    {
        name: 'data',
        alias: 'input',
        allowZero: true,
        default: Buffer.from([]),
    },
    {
        name: 'v',
        allowZero: true,
        default: Buffer.from([]),
    },
    {
        name: 'r',
        length: 32,
        allowZero: true,
        allowLess: true,
        default: Buffer.from([]),
    },
    {
        name: 's',
        length: 32,
        allowZero: true,
        allowLess: true,
        default: Buffer.from([]),
    },
];
