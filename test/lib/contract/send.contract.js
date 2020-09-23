let signAddress = require("../../../index")

const fs = require('fs');
const solc = require('solc');

let source = fs.readFileSync("/Users/tom/github/hd-address-sign/test/contracts/base.token.sol", 'utf8');

// let url = "https://ropsten.infura.io/DvTaqzNZpFvErBoHkvwL"
let url = "https://ropsten.infura.io/v3/393758f6317645be8a1ee94a874e12d9"

//https://github.com/ethereum/web3.js/issues/1040
// Q:sendRawTransaction后接口报错’invalid sender’
// A: 这个报错是以太坊环境错误导致的,代码上表现为chainId没对应.
// 签名需要制定环境chainId,若使用不带chainId的方法,则默认是主网.
let ethSign = signAddress.ETH({chain: "ropsten"}, url)

/*
* Compile Contract and Fetch ABI, bytecode
*/
it("eth tx send contruct", async () => {


    console.log('compiling contract...');
    let compilied = solc.compile(source, 1);


    let bytecode = compilied.contracts[':CallMeChallenge'].bytecode;

    // 签名 发行合约的交易
    let gasPriceGWei = ethSign.web3.utils.toWei("20", "gwei")
    let gasPriceHex = ethSign.web3.utils.toHex(gasPriceGWei)
    let gasPrice = await ethSign.web3.eth.getGasPrice()

    let tx = {
        gasPrice: ethSign.web3.utils.toHex(gasPrice),// '0x09184e72a000': 10,000 Gwei)
        gas: 3000000, //26,384
        value: '0x0',
    }
    let privateKey = "05c0f655cde1d2225939c5ef86f37f039ed2a67845a0ca920c854388cb34791c"
    let address = "0xbABF7bac084bB3Fbdfec5C823a16100FeCa69a96"
    let nonce = await ethSign.web3.eth.getTransactionCount(address)
    // tx.from = address// 可以不传 会通过私钥添加
    tx.nonce = nonce
    tx.data = "0x" + bytecode
    let txSignature = ethSign.signTx(tx, Buffer.from(privateKey, 'hex'))

    // send 0xc537221b9897be22db86d43d5e78169133a090544c5deaefd698b0470c4d8f3b
    let txRes = await ethSign.sendTx(txSignature.rawTransaction).catch(e => {
        console.log(e)
    })
    console.log(txRes)
    let txid = tx.transactionHash
    let makeTx;
    while (true) {
        makeTx = ethSign.web3.eth.getTransaction(txid);

        if (makeTx["blockNumber"] !== null) {
            var receipt = ethSign.web3.eth.getTransactionReceipt(txid);
            console.log("address: " + receipt["contractAddress"]); //0xBA414dCACc867473D65ebB55b8A0DB009D771DDa
            break;
        }
    }
})

let contructAddr =  "0xBA414dCACc867473D65ebB55b8A0DB009D771DDa"
let abiCallMeChallenge = [{
    "constant": false,
    "inputs": [],
    "name": "callme",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "isComplete",
    "outputs": [{"name": "", "type": "bool"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}]

// 调用只读方法
it("eth  contract call", async () =>{

    let contract = new ethSign.web3.eth.Contract(abiCallMeChallenge,contructAddr)
    let foo = await contract.methods.isComplete().call()
    console.log(foo)
})


it("eth contract send",async ()=>{

    let privateKey = "05c0f655cde1d2225939c5ef86f37f039ed2a67845a0ca920c854388cb34791c"
    let address = "0xbABF7bac084bB3Fbdfec5C823a16100FeCa69a96"
    let account =  ethSign.web3.eth.accounts.privateKeyToAccount(privateKey)
    console.assert(address == account.address)

    let contract = new ethSign.web3.eth.Contract(abiCallMeChallenge,contructAddr)
    let foo =  await contract.methods.callme()
    console.log(foo.encodeABI())
    let gas =await foo.estimateGas()


    let gasPriceGWei = ethSign.web3.utils.toWei("10", "gwei")
    let gasPriceHex = ethSign.web3.utils.toHex(gasPriceGWei)
    let tx = {
        gasPrice: gasPriceHex,// '0x09184e72a000': 10,000 Gwei)
        gas: gas, //26,384
        to: contructAddr,
        data: foo.encodeABI(),  //data 是 ETH 中的 input(message) ERC20 的交易这里 data 有不同的含义
    }
    let nonce = await ethSign.web3.eth.getTransactionCount(address)
    // tx.from = address// 可以不传 会通过私钥添加
    tx.nonce = nonce

    let txSignature = ethSign.signTx(tx, Buffer.from(privateKey, 'hex'))
    console.log(txSignature.transactionHash)

    console.log(txSignature.rawTransaction)
    // let addr = web3.eth.accounts.recoverTransaction(txSignature.rawTransaction)

    // console.assert(address == addr)

    // send 0xc537221b9897be22db86d43d5e78169133a090544c5deaefd698b0470c4d8f3b
    let txid = await ethSign.sendTx(txSignature.rawTransaction).catch(e => {
        console.log(e)
    })

    // this.web3.eth.sendSignedTransaction(serializedTx)
    console.log(txid)
})


it("eth contract web3 sign send",async ()=>{

    let privateKey = "05c0f655cde1d2225939c5ef86f37f039ed2a67845a0ca920c854388cb34791c"
    let address = "0xbABF7bac084bB3Fbdfec5C823a16100FeCa69a96"
    let account =  ethSign.web3.eth.accounts.privateKeyToAccount(privateKey)
    console.assert(address == account.address)

    let contract = new ethSign.web3.eth.Contract(abiCallMeChallenge,contructAddr)
    let foo =  await contract.methods.callme()
    console.log(foo.encodeABI())
    let gas =await foo.estimateGas()
    console.log( )

    let gasPriceGWei = ethSign.web3.utils.toWei("10", "gwei")
    let gasPriceHex = ethSign.web3.utils.toHex(gasPriceGWei)
    let tx = {
        gasPrice: gasPriceGWei,// '0x09184e72a000': 10,000 Gwei)
        gas: gas, //26,384
        to: contructAddr,
        data: foo.encodeABI(),  //data 是 ETH 中的 input(message) ERC20 的交易这里 data 有不同的含义
    }
    let nonce = await ethSign.web3.eth.getTransactionCount(address)
    // tx.from = address// 可以不传 会通过私钥添加
    tx.nonce = nonce

    let tt=await ethSign.web3.eth.accounts.signTransaction(tx,privateKey)
    let txSignature = await account.signTransaction(tx)
    console.log(txSignature.transactionHash)

    console.log(txSignature.rawTransaction)
    // let addr = web3.eth.accounts.recoverTransaction(txSignature.rawTransaction)

    // console.assert(address == addr)

    // send 0xc537221b9897be22db86d43d5e78169133a090544c5deaefd698b0470c4d8f3b
    let txid = await ethSign.sendTx(txSignature.rawTransaction).catch(e => {
        console.log(e)
    })

    // this.web3.eth.sendSignedTransaction(serializedTx)
    console.log(txid)
})

