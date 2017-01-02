module.exports = function(deployer) {
  var accounts = web3.eth.accounts
  deployer.deploy(Splitter, accounts[1], accounts[2]);
};
