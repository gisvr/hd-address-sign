let gas = require("../../../lib/utils/gas")

// https://docs.ethgasstation.info/gas-price

// fast: 1830, //gas price in x10 Gwei -> expected to be mined in < 2 minutes)
// fastest: 1980, //mined in < 30 seconds
// safeLow: 1700, //be mined in < 30 minutes
// average: 1780, //mined in < 5 minutes
// block_time: 10.433333333333334, //Average time(in seconds) to mine one single block
// blockNum: 10643254, //Latest block number
// speed: 0.8930439446245874, // Smallest value of (gasUsed / gaslimit) from last 10 blocks
// safeLowWait: 16.2, //Waiting time(in minutes) for safeLow gas price
// avgWait: 1.6, //Waiting time(in minutes) for average gas price
// fastWait: 0.4, // Waiting time(in minutes) for fast gas price
// fastestWait: 0.4, // Waiting time(in minutes) for fastest gas price

describe("gasstation", () => {
    it("gas ", async () => {
        let gasPrice = await gas.getGas()
        console.log(gasPrice.data)
    })
})