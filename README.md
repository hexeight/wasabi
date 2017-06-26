# wasabi
A command line tool/utility to quickly create JS abstractions for your Ethereum Smart contracts. Wasabi creates JS objects that allow you to easily deploy and interact with Ethereum Smart contracts.

# Getting started
Install wasabi globally.
```
npm install eth-wasabi -g
```

## Initialize
Create a new project in a directory. Creates directories for contracts, config and app.
```
wasabi init
```

## Configure
Wasabi can be configured to use an account on the RPC OR provide a `private_key` to sign contract deployment transactions locally. Local signing is helpful when using Infura or other public RPC nodes. If a `private_key` is provided, the `from` address will be ignored, and wasabi will perform client side signing for deployment transactions.

```
{
    // http endpoint for JSON RPC e.g. http://localhost:8545
	"host": "http://localhost:8545",
    // Maximum gas budget for a contract
    "max_gas": "100000000",
    // Deploy contract from address
    "from": "0x00000000000000000000",
    // Use private key to sign transactions in wasabi
	//"private_key": "YOUR_PRIVATE_KEY",
    // Path to contract files
	"contracts": ["contracts/SimpleStorage.sol"]
}
```

## Compile
Complile solidity contracts listed in config and compile check for errors.
```
wasabi compile
```

## Deploy
Deploy solidity contracts through the RPC node provided in config.
```
wasabi deploy
```

## Demo
Run a http server running at `http://localhost:8888` hosting static files in the `app` directory to test your Dapp.
```
wasabi serve
```

Note: Wasabi is being used for my personal projects to understand JSON RPC interactions essentional for a fully function Dapp. All the features are built to serve my own desperate needs. If you'd love to do something, feel free to go crazy with nice and descriptive issues, feature requests or pull requests.
