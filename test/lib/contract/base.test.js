let EthContract = require("../../../lib/utils/ethContract")

const fs = require('fs');

let source = fs.readFileSync("/Users/liyu/github/hd-address-sign/test/contracts/base.token.sol", 'utf8');

let url = "https://ropsten.infura.io/v3/393758f6317645be8a1ee94a874e12d9"

let privateKey = "05c0f655cde1d2225939c5ef86f37f039ed2a67845a0ca920c854388cb34791c"
let address = "0xbABF7bac084bB3Fbdfec5C823a16100FeCa69a96"
let ethContract = new EthContract({chain: "ropsten"}, url)


it("eth base contract delopy ", async () => {

    let {contractAbi, contractByteCode, gas} =await ethContract.getCompileInfo(source)
    let contractReceipt = await ethContract.delopy(contractByteCode,privateKey, gas).catch(e => {
        throw e
    })

    let contractAddress = contractReceipt.contractAddress

    console.log("Contract address:", contractAddress)
    console.log("Contract Abi:", contractAbi)

    console.log('send finish...', contractReceipt);
})

it("eth base contract call", async () => {
    let addr = "0x4F1aE7918C285f6E66265A8aAC110A99189383fd"
    let abi =[{"constant":false,"inputs":[],"name":"callme","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"isComplete","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"}]
    let contract = ethContract.contract(abi,addr)
    let foo = await contract.methods.isComplete().call()
    console.log(foo)
})

it("eth base contract send", async () => {
    let addr = "0x4F1aE7918C285f6E66265A8aAC110A99189383fd"
    let abi =[{"constant":false,"inputs":[],"name":"callme","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"isComplete","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"}]
    let contract = ethContract.contract(abi,addr)
    let foo = await contract.methods.callme()

    let txRecepit =await ethContract.contractSend(addr,foo,privateKey)
    console.log(txRecepit)
})

it("eth  base contract delopy error", async () => {

    // let {contractAbi, contractByteCode, gas} = ethContract.getCompileInfo(source)
    // let contractReceipt = await ethContract.delopy(contractAbi, contractByteCode, gas, privateKey).catch(e => {
    //     throw e
    // })

    // // send
    // // infura: The method eth_sendTransaction does not exist/is not available
    // async delopy(contractAbi, contractByteCode, gas, privateKey) {
    //     let account = this.web3.eth.accounts.privateKeyToAccount(privateKey)
    //     const myContact = new this.web3.eth.Contract(JSON.parse(contractAbi))
    //     return myContact.deploy({data: contractByteCode}).send({
    //         from: account.address,
    //         gas
    //     })
    // }


    console.log('send finish...', contractReceipt);
})