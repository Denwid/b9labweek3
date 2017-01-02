function assertIsAddress(value) {
    assert.isTrue(web3.isAddress(value));
}

contract('Splitter', function(accounts) {
  var valueSent = 20000000;
  it("was deployed correctly with addresses set", function() {
    var splitter = Splitter.deployed()
    var accountA_was_set = splitter.accountA().then(assertIsAddress);
    var accountB_was_set = splitter.accountB().then(assertIsAddress);
    return accountA_was_set && accountB_was_set;
  });
  it("calling takeEther with 20'000'000 wei works correctly", function() {
    var senderBefore = web3.eth.getBalance(web3.eth.coinbase);
    var accountAbefore = web3.eth.getBalance(accounts[1]);
    var accountBbefore = web3.eth.getBalance(accounts[2]);

    var splitter = Splitter.deployed();
    var estimatedGas = 100000; //guess via splitter.contract.takeEther.estimateGas(function(e, r) { console.log(r); });
    var transactionObject = {
        from: web3.eth.coinbase,
        to: splitter.address,
        value: valueSent,
        gas: estimatedGas
    }
    return splitter.takeEther(transactionObject)
    .then(function(e, r) {

        var senderAfter = web3.eth.getBalance(web3.eth.coinbase);
        var senderDifference = senderBefore.minus(senderAfter).valueOf();
        var senderSpentCorrectAmount = assert.isAtLeast(senderDifference, valueSent, "Sender wrong amount spent?");

        var accountAafter = web3.eth.getBalance(accounts[1]);
        var accountAdifference = accountAbefore.minus(accountAafter).valueOf();
        var accountAreceivedCorrectAmount = assert.equal(accountAdifference, -valueSent/2, "accountA wrong amount received?");

        var accountBafter = web3.eth.getBalance(accounts[2]);
        var accountBdifference = accountBbefore.minus(accountBafter).valueOf();
        var accountBreceivedCorrectAmount = assert.equal(accountBdifference, -valueSent/2, "accountB wrong amount received?");

        return senderSpentCorrectAmount && accountAreceivedCorrectAmount && accountBreceivedCorrectAmount;
    })
  });
  it("amountA and amountB are correct after first split", function() {
    var splitter = Splitter.deployed();
    var amountAcorrect = splitter.amountA().then(function(r) {
        assert.equal(r, valueSent/2);
    })
    var amountBcorrect = splitter.amountB().then(function(r) {
        assert.equal(r, valueSent/2);
    })
    return amountAcorrect && amountBcorrect
  })
});
