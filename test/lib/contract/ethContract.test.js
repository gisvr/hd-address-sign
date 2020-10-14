let EthContract = require("../../../lib/utils/ethContract")
let commonInfo = require("../../../lib/utils/getCommInfo")
const fs = require('fs');

let source = fs.readFileSync("/Users/liyu/github/hd-address-sign/test/contracts/base.token.sol", 'utf8');

// let url = "https://ropsten.infura.io/DvTaqzNZpFvErBoHkvwL"
let url = "https://ropsten.infura.io/v3/393758f6317645be8a1ee94a874e12d9"
let privateKey = "05c0f655cde1d2225939c5ef86f37f039ed2a67845a0ca920c854388cb34791c"
/*
* Compile Contract and Fetch ABI, bytecode
*/
let ethContract = new EthContract({chain: "ropsten"}, url)
it("eth contract compile", async () => {
    // let versionList = await commonInfo.getSolcVersionList()

    // 0.4.18+commit.9cf6e910.Emscripten.clang
    // // soljson-v0.4.18+commit.9cf6e910.js
    // let version = "0.4.18"
    // version = versionList.releases[version]
    // version = version.match(/(-)(.*?)(\.js)/)[2]
    let foo = await ethContract.compile(source, "v0.4.18+commit.9cf6e910").catch(e => {
        console.log(e)
    })
    // console.log(foo)
    let contract = foo[":CallMeChallenge"]
    console.log(contract.interface)
    console.log(contract.bytecode)
    console.log(contract.gasEstimates.creation[1])
})

it("eth contract sign", async () => {
    // let versionList = await commonInfo.getSolcVersionList()

    let code = "60606040526000805460ff19169055341561001957600080fd5b60c7806100276000396000f30060606040526004361060485763ffffffff7c0100000000000000000000000000000000000000000000000000000000600035041663a3c8e3938114604d578063b2fa1c9e14605f575b600080fd5b3415605757600080fd5b605d6083565b005b3415606957600080fd5b606f6092565b604051901515815260200160405180910390f35b6000805460ff19166001179055565b60005460ff16815600a165627a7a7230582029c40c25261313ec6a0e033eeee5f837e300dfe4dfe4cb553ec4e7c052df85bb0029"

    let foo = await ethContract.sign(code, privateKey)
    console.log(foo.rawTransaction)
})

it('eth contract send', async () =>{
    let code = "60606040526000805460ff19169055341561001957600080fd5b60c7806100276000396000f30060606040526004361060485763ffffffff7c0100000000000000000000000000000000000000000000000000000000600035041663a3c8e3938114604d578063b2fa1c9e14605f575b600080fd5b3415605757600080fd5b605d6083565b005b3415606957600080fd5b606f6092565b604051901515815260200160405180910390f35b6000805460ff19166001179055565b60005460ff16815600a165627a7a7230582029c40c25261313ec6a0e033eeee5f837e300dfe4dfe4cb553ec4e7c052df85bb0029"
    let foo = await ethContract.sign(code, privateKey)
    let foo1 = await ethContract.send(foo.rawTransaction)
    console.log(foo1)
});

it("eth contract delopy", async () => {
    // let versionList = await commonInfo.getSolcVersionList()

    // 0.4.18+commit.9cf6e910.Emscripten.clang
    // // soljson-v0.4.18+commit.9cf6e910.js
    // let version = "0.4.18"
    // version = versionList.releases[version]
    // version = version.match(/(-)(.*?)(\.js)/)[2]
    let foo = await ethContract.compile(source, "v0.4.18+commit.9cf6e910").catch(e => {
        console.log(e)
    })
    // console.log(foo)
    let contract = foo[":CallMeChallenge"]
    console.log(contract.interface)
    console.log(contract.bytecode)
    console.log(contract.gasEstimates.creation[1])
    let foo1 = await ethContract.delopy(contract.interface, contract.bytecode, contract.gasEstimates.creation[1],privateKey)
    console.log(foo1)
})


//The method eth_sendTransaction does not exist
//Infura doesn't support sending non-raw transactions See  https://infura.io/docs/ethereum/json-rpc/eth_sendRawTransaction
//
it("eth contract send error",async ()=>{

    let privateKey = "05c0f655cde1d2225939c5ef86f37f039ed2a67845a0ca920c854388cb34791c"
    let address = "0xbABF7bac084bB3Fbdfec5C823a16100FeCa69a96"
    let account =  ethSign.web3.eth.accounts.privateKeyToAccount(privateKey)
    console.assert(address == account.address)

    let contract = new ethSign.web3.eth.Contract(abiCallMeChallenge,contructAddr)
    let foo =  await contract.methods.callme().send({from: account.address})
    console.log(foo)
})

