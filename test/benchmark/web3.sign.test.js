
let hdAddress = require("hd-address")
let ethAddress = hdAddress.HD().ETH

let signAddress = require("../../index")
let ethSign = signAddress.ETH()

const Web3 = require("web3")
const web3 = new Web3()

class web3Sign {

    static hash(msg) {
        return web3.eth.accounts.hashMessage(msg);
    }

    static async signTx(rawTx, priv) {
        // let TransactionConfig = {
        //     from?: string | number;
        //     to?: string;
        //     value?: number | string | BN;
        //     gas?: number | string;
        //     gasPrice?: number | string | BN;
        //     data?: string;
        //     nonce?: number;
        //     chainId?: number;
        //     common?: Common;
        //     chain?: string;
        //     hardfork?: string;
        // }
        return web3.eth.accounts.signTransaction(rawTx, priv);
    }

    //  var preamble = '\x19Ethereum Signed Message:\n' + messageBytes.length;
    static signMsg(msg, priv) {
        return web3.eth.accounts.sign(msg, priv);
    }

    static verfiySignMsg(signature, msg) {
        return web3.eth.accounts.recover(msg, signature)
    }

}

let msg = 'today is 20171026'
// var preamble = '\x19Ethereum Signed Message:\n' + messageBytes.length;
let web3Msg = '\x19Ethereum Signed Message:\n' + msg.length + 'today is 20171026'

let tx = {
    to: '0x0000000000000000000000000000000000000000',
    value: '0x0',
    data: '0x0'
}

// https://medium.com/my-blockchain-development-daily-journey/ethereum-%E7%94%A8web3-js%E4%BE%86%E7%B0%BD%E7%AB%A0-5b6b6dbb4d59
describe("address sign", () => {
    it(" web3 hash msg", () => {
        let msgHash = web3Sign.hash(msg)
        console.log(msgHash)
        let web3MsgHash = ethSign.hash(web3Msg)
        console.log(web3MsgHash)

    })

    it(" web3 sign tx",async () => {
        let {pri, path} = ethAddress.getCoinKeyPair(1)
        let {address} = ethAddress.getAddressByPrivateKey(pri)
        console.log(address, path)
        tx.from = address

        let txSign =await web3Sign.signTx(tx,pri.toString("hex"))
        console.log(txSign)

    })

    it(" web3 sign msg", () => {
        let {pub, pri} = ethAddress.getCoinKeyPair(1)

        let signObj = web3Sign.signMsg(msg, pri.toString("hex"))
        console.log(signObj.signature)

        let signature = ethSign.signMsg(web3Msg, pri)
        console.log(signature)


    })

    it(" web verfiy msg sign", async () => {
        let {pub, pri} = ethAddress.getCoinKeyPair(1)
        let signObj = web3Sign.signMsg(msg, pri.toString("hex"))
        console.log(signObj.signature)

        let {address} = ethAddress.getAddressByPublicKey(pub)
        console.log(address)
        let pubKeyAddr = web3Sign.verfiySignMsg(signObj.signature, msg)
        console.log(pubKeyAddr)
        let pubkey = ethSign.verfiySignMsg(signObj.signature, web3Msg)
        let addrr = ethAddress.getAddressByPublicKey(pubkey)
        console.log(addrr.address)
    })
})