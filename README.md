# wasabi
A command line tool/utility to quickly create JS abstractions for your Ethereum Smart contracts. Wasabi creates JS objects that allow you to easily deploy and interact with Ethereum Smart contracts. Read more about why I built Wasabi [http://0x8.in/eth-wasabi/](http://0x8.in/eth-wasabi/).

# Getting started
Install wasabi globally.
```
npm install eth-wasabi -g
```

### Quick start tutorial
[![Building and Deploying contracts with Wasabi](https://img.youtube.com/vi/z6ACHroi3zY/0.jpg)](https://www.youtube.com/watch?v=z6ACHroi3zY)

## Initialize
Create a new project in a directory. Creates directories for contracts, config and app.
```
wasabi init
```

## Configure
Wasabi can be configured to use an account on the RPC OR provide a `private_key` to sign contract deployment transactions locally. Local signing is helpful when using Infura or other public RPC nodes. If a `private_key` is provided, the `from` address will be ignored, and wasabi will perform client side signing for deployment transactions.

```js
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
Complile solidity contracts listed in config and compile check for errors. Wasabi uses 'solc' for copiling solidity contracts.
```
wasabi compile
```

## Deploy
Deploy solidity contracts through the RPC node provided in config.
```
wasabi deploy
```

### Developing Dapps
On successful `wasabi deploy`, the contract address and ABI are made available in `app/contracts.json`. A scaffolded JS in also available in `app/wasabi.js`, which can be used in Dapps to populate `web3` contracts instances using `contracts.json`.

## Demo
Run a http server running at `http://localhost:8888` hosting static files in the `app` directory to test your Dapp.
```
wasabi serve
```

Note: Wasabi is being used for my personal projects to understand JSON RPC interactions essentional for a fully function Dapp. All the features are built to serve my own desperate needs. If you'd love to do something, feel free to go crazy with nice and descriptive issues, feature requests or pull requests.
