'use strict';

let Sign = require("./base/sign.class")
const Transaction = require('ethereumjs-tx').Transaction
const {ecdsaSign, ecdsaRecover} = require('secp256k1');
const Web3 = require("web3")

let removeTrailing0x = (str) => {
    if (str.startsWith('0x'))
        return str.substring(2);
    else return str;
}

let hexToUnit8Array = (str) => {
    return new Uint8Array(Buffer.from(str, 'hex'));
}

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

module.exports = class EthSign extends Sign {
    constructor(opts, url) {
        super("", "")
        if (opts === void 0) {
            opts = {};
        }
        // instantiate Common class instance based on passed options
        if (opts.common) {
            if (opts.chain || opts.hardfork) {
                throw new Error('Instantiation with both opts.common, and opts.chain and opts.hardfork parameter not allowed!');
            }
            this.opts = opts.common;
        } else {
            let chain = opts.chain ? opts.chain : 'mainnet';
            let hardfork = opts.hardfork ? opts.hardfork : 'petersburg';
            this.opts = {chain, hardfork}
        }
        this.web3 = new Web3()
        if (url) {
            let web3Provider = new Web3.providers.HttpProvider(url)
            // web3 需要设置环境变量 NODE_TLS_REJECT_UNAUTHORIZED = 0
            // web3Provider.httpAgent = new HttpsProxyAgent("http://127.0.0.1:8899")
            // web3Provider.httpsAgent = new HttpsProxyAgent("http://127.0.0.1:8899")
            this.web3.eth.setProvider(web3Provider)// 为扫链简化请求
        }
    }

    hash(msg) {
        let hash
        if (msg.startsWith('0x')) {
            hash = msg
        } else {
            hash = this.web3.utils.sha3(msg)
        }
        if (hash.length !== 66)
            throw new Error('EthCrypto.sign(): Can only sign hashes, given: ' + hash);
        return removeTrailing0x(hash)
    }

    signTx(rawTx, privateKey) {
        // opts?: TransactionOptions
        const ethTx = new Transaction(rawTx, this.opts)
        // console.log(tx.toJSON())
        ethTx.sign(privateKey);

        let validationResult = ethTx.validate(true);

        if (validationResult !== '') {
            throw new Error('Signer Error: ' + validationResult);
        }

        let rlpEncoded = ethTx.serialize().toString('hex');
        let rawTransaction = '0x' + rlpEncoded;
        let transactionHash = this.web3.utils.sha3(rawTransaction);
        // web3.utils.sha3(string)
        // web3.utils.keccak256(string) // ALIAS

        return {
            messageHash: '0x' + Buffer.from(ethTx.hash(false)).toString('hex'),
            v: '0x' + Buffer.from(ethTx.v).toString('hex'),
            r: '0x' + Buffer.from(ethTx.r).toString('hex'),
            s: '0x' + Buffer.from(ethTx.s).toString('hex'),
            rawTransaction: rawTransaction,
            transactionHash: transactionHash,
        };

        // return tx.serialize()
    }


    signMsg(msg, priv) {
        let hash = this.hash(msg)
        const sigObj = ecdsaSign(
            new Uint8Array(Buffer.from(hash, 'hex')),
            new Uint8Array(priv)
        );

        const recoveryId = sigObj.recid === 1 ? '1c' : '1b';

        const newSignature = '0x' + Buffer.from(sigObj.signature).toString('hex') + recoveryId;
        return newSignature;
    }

    /**
     * returns the publicKey for the privateKey with which the messageHash was signed
     * @param  {string} signature
     * @param  {string} msg
     * @param  {bool} pubkey compress
     * @return {string} publicKey
     */
    verfiySignMsg(signature, msg, compress = true) {
        let hash = this.hash(msg)
        signature = removeTrailing0x(signature);
        // split into v-value and sig
        const sigOnly = signature.substring(0, signature.length - 2); // all but last 2 chars
        const vValue = signature.slice(-2); // last 2 chars

        const recoveryNumber = vValue === '1c' ? 1 : 0;

        return ecdsaRecover(
            hexToUnit8Array(sigOnly),
            recoveryNumber,
            hexToUnit8Array(hash),
            compress
        )
    }

    async sendTx(serializedTx) {
      return this.web3.eth.sendSignedTransaction(serializedTx)
            .on('receipt', (id) => {
                console.log(id)
            }).catch(e => {
            console.log(e)
        });
    }
}
