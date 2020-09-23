'use strict';

let axios = require("axios")

module.exports = class GasPrice {
    static async getGasPriceList() {
        return (await axios.get("https://ethgasstation.info/api/ethgasAPI.json")).data
    }
    static async getSolcVersionList(){
        return (await axios.get("https://solc-bin.ethereum.org/bin/list.json")).data
    }
}