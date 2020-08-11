let signAddress = require("../index")
let hdAddress = require("hd-address")

const Web3 = require("web3")
const web3 = new Web3()
//proxy: "https://web3.token.im",
//proxy: "http://172.16.100.106:18545", new
//proxy: "http://172.16.100.106:38545", parity
// http://127.0.0.1:7545 gan
// https://ropsten.infura.io/v3/4446248e622048fba5e2ee37f5dc10d2
// HQK3Y9C1HHY13ZGNBNXR5MC15UV4WT6QCA
// AppName: biboxtest
// grpc_port: 12001,
//     rpc: {
//     url: "https://mainnet.infura.io/v3/4446248e622048fba5e2ee37f5dc10d2",

let ethAddress = hdAddress.HD().ETH
let msg = 'today is 20171026'
let {pub, pri} = ethAddress.getCoinKeyPair(1)
// let url = "https://ropsten.infura.io/DvTaqzNZpFvErBoHkvwL"
let url = "https://ropsten.infura.io/v3/393758f6317645be8a1ee94a874e12d9"
let ethSign = signAddress.ETH({chain:"ropsten"}, url)

describe("address sign", () => {
    it("eth sign tx", () => {
        let tx = {
            to: '0x0000000000000000000000000000000000000000',
            value: '0x0',
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

    it("eth tx send",async () => {
        let tx = {
            // to: '0x36B1a29E0bbD47dFe9dcf7380F276e86da90c4c2',
            nonce: '0x00',
            gasPrice: '0x09184e72a',// '0x09184e72a000': 10,000 Gwei)
            gasLimit: '0x6710', //26,384
            to: '0x36B1a29E0bbD47dFe9dcf7380F276e86da90c4c2',
            value: '0x00',
            data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057',
        }
        let privateKey = "05c0f655cde1d2225939c5ef86f37f039ed2a67845a0ca920c854388cb34791c"
        let address = "0xbABF7bac084bB3Fbdfec5C823a16100FeCa69a96"
        let nonce = await ethSign.web3.eth.getTransactionCount(address)
        tx.from = address
        tx.nonce = nonce
        let txSignature = ethSign.signTx(tx, Buffer.from(privateKey, 'hex'))
        console.log(txSignature.transactionHash)
        // send
        let txid = await ethSign.sendTx(txSignature.rawTransaction)
        console.log(txid)
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