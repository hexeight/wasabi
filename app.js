var Web3 = require("web3");
var Solc = require("solc");
var Config = require("config");
var fs = require('fs');

var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(Config.get('host')));

// Set Gas price
var gasPrice = Config.get('maxGas');

// Set address
var fromAddress = (Config.has('from')) ? Config.get('from') : web3.eth.accounts[0];
if (fromAddress == null)
    throw new Error("Contract author address not set!");

// Read contracts and create inputs
var input = {};
var contracts = Config.get('contracts');

for (var i = 0; i < contracts.length; i++) {
    // read file
    console.log("Reading contract:", contracts[i]);
    var data = fs.readFileSync(contracts[i], 'utf8');
    input[contracts[i]] = data;
}

// Compile input
var output = Solc.compile({ sources: input }, 1);

// Estimate Gas for all contracts
var gasQuote = {};
for (var contract in output.contracts) {
    var code = "0x" + output.contracts[contract].bytecode;
    var gas = web3.eth.estimateGas({
        from: fromAddress,
        data: code
    });
    console.log("Contract ", contract, ": estimated gas ", gas);
    if (gas > gasPrice) {
        throw new Error("Gas price estimate is higher than made maxGas.");
    }
    gasQuote[contract] = gas;
}

// Sign to RPC node
for (var contract in output.contracts) {
    var code = "0x" + output.contracts[contract].bytecode;
    var abi = JSON.parse(output.contracts[contract].interface);
    var c = web3.eth.contract(abi);
    pushContract(contract, c);
}

function pushContract (name, c) {
    var x = c.new({
        from: fromAddress,
        data: code,
        gas: gasQuote[contract]
    }, function (e, contract) {
        if (!e) {
            if (!contract.address) {
                console.log("Contract transaction pushed: TransactionHash (", contract.transactionHash, ") waiting to be mined...");
            }
            else {
                console.log("Contract mined! Address: ", contract.address);
                writeSolJSON(name, contract.address, contract.abi);
            }
        }
        else {
            throw new Error(e);
        }
    });
}

function writeSolJSON(name, address, abi) {
    source = name.split(":")[0];
    name = name.split(":")[1];
    var conf = JSON.stringify({ source: source, name: name, address: address, abi: abi });
    fs.writeFile(source + ".json", conf, (err) => {
        if (err) throw err;
        console.log(name + ".json created with address and ABI details.");
    });
}