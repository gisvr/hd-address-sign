let Sign = {
    ETH: require("./lib/eth.sign"),
    TRX: require("./lib/eth.sign"),
}

module.exports = {
    ETH: (opts,url) => {
        return new Sign.ETH(opts,url)
    },
    TRX: (opts) => {
        return new Sign.ETH(opts,url)
    }
}