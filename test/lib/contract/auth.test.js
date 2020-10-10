let EthContract = require("../../../lib/utils/ethContract")
let commonInfo = require("../../../lib/utils/getCommInfo")
const fs = require('fs');

let source = fs.readFileSync("/Users/liyu/github/hd-address-sign/test/contracts/auth.sol", 'utf8');


let url = "https://ropsten.infura.io/v3/393758f6317645be8a1ee94a874e12d9"
let privateKey = "05c0f655cde1d2225939c5ef86f37f039ed2a67845a0ca920c854388cb34791c"
let ethContract = new EthContract({chain: "ropsten"}, url)


it("eth create auth contract", async () => {
    try {

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
        let foo = await ethContract.compile(source, version).catch(e => {
            throw e
        })

        console.log('compiling finish...');
        let contract = foo[":" + contractName]
        let contractAbi = contract.interface
        // console.log("Contract Abi:",contractAbi)
        let byteCode = contract.bytecode
        let gas = contract.gasEstimates.creation[1]*10

        let contarctSign = await ethContract.sign(byteCode, privateKey, gas).catch(e => {
            throw e
        })
        let txSignature = contarctSign.rawTransaction
        console.log('sign finish...');

        let contractReceipt = await ethContract.send(txSignature).catch(e=>{
            throw e
        })

        console.log('send finish...');
        let contractAddress = contractReceipt.contractAddress

        console.log("Contract address:",contractAddress)
        console.log("Contract Abi:",contractAbi)
    } catch (e) {
        console.log(e)
    }
})

it("eth auth contract call", async () => {
    let addr = "0xF560381bCA6dC44cD1D486E359404b198081025F"
    let abi =[{"constant":true,"inputs":[{"name":"hash","type":"bytes32"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"}],"name":"verify","outputs":[{"name":"retAddr","type":"address"}],"payable":false,"type":"function"}]
    let contract = ethContract.contract(abi,addr)
    let signData = ethContract.signMsg("TT",privateKey)
    let hash = signData.messageHash
    let v = signData.v
    let r = signData.r
    let s = signData.s
    let foo = await contract.methods.verify(hash,v,r,s).call()
    console.log(foo)
})