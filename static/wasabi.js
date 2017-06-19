function startApp () {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var wasabi = JSON.parse(xmlHttp.responseText);
            wasabi.forEach(function (contract, index) {
                var definition = web3.eth.contract(contract.abi);
                var c = definition.at(contract.address);
                window[contract.name] = {
                    deployed: function () {
                        return c;
                    },
                    at: function (address) {
                        return definition.at(address);
                    }
                };
            });
        }
    }
    xmlHttp.open("GET", "/contracts.json", true);
    xmlHttp.send(null);
}

window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
    var event = new Event('web3-loaded');
    window.dispatchEvent(event);
  } else {
    console.error("Web3 is undefined: Your browser does not support dApps. Please use Mist, Metamask of comparable dApp explorer.");
    var event = new Event('web3-failed');
    window.dispatchEvent(event);
    return;
  }
});