let EthContract = require("../../lib/utils/ethContract")

let url = "https://ropsten.infura.io/v3/393758f6317645be8a1ee94a874e12d9"


// mint
let mintAddress = "0x58c360e4E1544cf9f6AA7cF75402B3E93620AcdA"

let providerAbi = require("./abi/LendingPoolAddressesProvider.json")
let ethContract = new EthContract({chain: "ropsten"}, url)

let proxyContract = ethContract.contract(providerAbi, mintAddress)

//方法参考 https://etherscan.io/address/0x24a42fD28C976A61Df5D00D0599C34c4f90748c8#readContract

// onlyLendingPoolConfigurator
// 4. getLendingPoolConfigurator
//setLendingPoolConfiguratorImpl
it("setLendingPoolConfiguratorImpl call", async () => {
    let  confAddr = await proxyContract.methods.setLendingPoolConfiguratorImpl("0x2E9D15d024187477F85Ac7cD7154aD8556EDb8E2")

    let privateKey = "76d099613fc3e386db8afd16679e33de6a16c757427b7b6ab3a2eed4a864f45d"
    let txRecepit = await ethContract.contractSend(mintAddress, confAddr, privateKey)
    console.log(txRecepit)
    //0x531dfa570234387a7c504ed46ae3b5fe02ea6d67dd293c93b230ca6ddc52a024
    //Cannot set a proxy implementation to a non-contract address
})

