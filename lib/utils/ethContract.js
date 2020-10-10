'use strict';

let EthClass = require("../base/eth.class")
let commonInfo = require("./getCommInfo")
const solc = require('solc');


let sleep = async (ms) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(true)
        }, ms)
    }).catch(e => {
        throw e
    })
}


module.exports = class EthContract extends EthClass {
    constructor(opts, url) {
        //https://github.com/ethereum/web3.js/issues/1040
        // Q:sendRawTransaction后接口报错’invalid sender’
        // A: 这个报错是以太坊环境错误导致的,代码上表现为chainId没对应.
        // 签名需要制定环境chainId,若使用不带chainId的方法,则默认是主网.
        super(opts, url);
    }

    // version https://solc-bin.ethereum.org/bin/list.json
    // https://ethereum.github.io/solc-bin/bin/soljson-v0.7.1-nightly.2020.8.12+commit.acdaff63.js
    // https://solc-bin.ethereum.org/bin/soljson-v0.4.20-nightly.2017.12.1+commit.6d8d0393.js
    // https://github.com/ethereum/solc-bin
    async compile(source, version) {
        console.log('compiling contract...', solc.version());
        return new Promise((resolve, reject) => {
            solc.loadRemoteVersion(version, async (err, solcSnapshot) => {
                if (err) {
                    reject(err)
                }
                try {
                    console.log('loadRemoteVersion contract...', solcSnapshot.version());
                    //  Setting 1 as second paramateractivates the optimiser
                    let compiled = await solcSnapshot.compile(source, 1);
                    resolve(compiled.contracts)
                } catch (e) {
                    reject(e)
                }

            })
        })
    }

    async getCompileInfo(source) {
        let versionList = await commonInfo.getSolcVersionList().catch(e => {
            throw e
        })
        //去除换行
        source = source.replace(/\n/g, "")
        // 提取版本和contract name
        let socInfo = source.match(/(\^)(.*)(;.*)(.*?contract.*?\s)(.*?)(\s)/)
        let version = socInfo[2]
        let contractName = socInfo[5].trim()

        version = versionList.releases[version]
        version = version.match(/(-)(.*?)(\.js)/)[2]
        let compileRes = await this.compile(source, version).catch(e => {
            throw e
        })

        console.log('compiling finish...');
        let contract = compileRes[":" + contractName]
        let contractAbi = contract.interface
        // console.log("Contract Abi:",contractAbi)
        let contractByteCode = contract.bytecode
        let gas = contract.gasEstimates.creation[1] * 10

        return {
            contractAbi,
            contractByteCode,
            gas,
        }
    }

    contract(abi, contractAddress) {
        return new this.web3.eth.Contract(abi, contractAddress)
    }

    async contractSend(contractAddress, method, privateKey) {
        let account = this.web3.eth.accounts.privateKeyToAccount(privateKey)
        let gasPrice = await this.web3.eth.getGasPrice()
        let nonce = await this.web3.eth.getTransactionCount(account.address)

        let data =await method.encodeABI()

        let gas = 21000 * 100
        gasPrice = gasPrice *10
        let to = contractAddress
        let rawTx = {
            gasPrice, gas, to, data, nonce
        }
        let txSignature =await account.signTransaction(rawTx);

        console.log(txSignature.transactionHash)
        // console.log(txSignature.rawTransaction)

        return this.send(txSignature.rawTransaction).catch(e => {
            console.log(e)
        })

    }

    async delopy(contractByteCode, privateKey, gas) {
        let contarctSign = await this.sign(contractByteCode, privateKey, gas).catch(e => {
            throw e
        })
        return this.send(contarctSign.rawTransaction).catch(e => {
            throw e
        })

    }

    async sign(byteCode, privateKey, gas) {
        let account = this.web3.eth.accounts.privateKeyToAccount(privateKey)
        let gasPrice = await this.web3.eth.getGasPrice()
        let nonce = await this.web3.eth.getTransactionCount(account.address)
        let data = "0x" + byteCode

        let tx = {
            gasPrice, gas, nonce, data
        }

        let txSignature = await account.signTransaction(tx)

        return txSignature

    }

    async send(txSignature) {
        let txRes = await this.web3.eth.sendSignedTransaction(txSignature).catch(e => {
            throw e
        })
        let txid = txRes.transactionHash
        return new Promise(resolve => {
            let makeTx;
            while (true) {
                makeTx = this.web3.eth.getTransaction(txid);
                if (makeTx["blockNumber"] !== null) {
                    let receipt = this.web3.eth.getTransactionReceipt(txid);
                    resolve(receipt)
                    break;
                }
                sleep(2000)
            }
        })
    }

    signMsg(msg, priv) {
        return this.web3.eth.accounts.sign(msg, priv);
    }
}

