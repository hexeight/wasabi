var Web3 = require("web3");
var Solc = require("solc");
var Config = require("config");

var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(Config.get('endpoint')));

// Set Gas price
var gasPrice = Config.get('gas');

// Set address
var fromAddress = (Config.has('from')) ? Config.get('from') : web3.eth.accounts[0];
if (fromAddress == null)
    throw new Error("Contract author address not set!");

// Set and Compile contract
var input = Config.get('contract');
var output = Solc.compile(input, 1);

var contractName = ":x";
var code = '0x' + output.contracts[contractName].bytecode;
var abi = JSON.parse(output.contracts[contractName].interface);

console.log(code, abi);

var contract = web3.eth.contract(abi);
var x = contract.new({
    from: fromAddress,
    data: code,
    gas: gasPrice
}, function (e, c) {
    console.log(e);
    if (!e) {
        console.log(c);
    }
});