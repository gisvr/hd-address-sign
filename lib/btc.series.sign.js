'use strict';


let Sign = require("./base/sign.class")
const bitcoin = require("bitcoinjs-lib");
let checkTx = (tx) => {

}

module.exports = class BtcSeriesSign extends Sign {
    constructor(opts) {
        super("")
        this.tx = new bitcoin.TransactionBuilder();
    }

    //https://medium.com/@orweinberger/how-to-create-a-raw-transaction-using-bitcoinjs-lib-1347a502a3a
    //https://live.blockcypher.com/btc-testnet/decodetx/
    signTx(txParams, priv) {
        // let key = bitcoin.ECKey.fromWIF("L1Kzcyy88LyckShYdvoLFg1FYpB5ce1JmTYtieHrhkN65GhVoq73");
        let key = bitcoin.ECKey.fromHex(priv);
        console.log(key.pub.getAddress().toString()); //The above should output: 17hFoVScNKVDfDTT6vVhjYwvCu6iDEiXC4
        this.tx.addInput("d18e7106e5492baf8f3929d2d573d27d89277f3825d3836aa86ea1d843b5158b", 1);
        this.tx.addOutput("12idKQBikRgRuZEbtxXQ4WFYB7Wa3hZzhT", 149000); // 1000 satoshis will be taken as fee.
        this.tx.sign(0, key);
        console.log(this.tx.build().toHex());
    }

    //https://www.blockchain.com/btc/pushtx
    //https://insight.bitpay.com/tx/send
    sendTx(txHash) {

    }
}
