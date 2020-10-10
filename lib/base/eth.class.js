'use strict';

let Sign = require("./sign.class")
const Web3 = require("web3")
const HttpsProxyAgent = require('https-proxy-agent')



module.exports = class EthClass extends Sign {
    constructor(opts, url) {
        super("", "")
        // opts?: TransactionOptions
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
            // web3 代理 需要设置环境变量 export NODE_TLS_REJECT_UNAUTHORIZED = 0
            // web3Provider.httpAgent = new HttpsProxyAgent("http://127.0.0.1:8899")
            // web3Provider.httpsAgent = new HttpsProxyAgent("http://127.0.0.1:8899")
            this.web3.eth.setProvider(web3Provider)
        }
    }
}
