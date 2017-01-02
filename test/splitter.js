function assertIsOne(value) {
    assert.equal(value.valueOf(), 1, value.valueOf()+" doesn't seem to be one");
}

function assertIsTwo(value) {
    assert.equal(value.valueOf(), 2, value.valueOf()+" doesn't seem to be two");
}

contract('Splitter', function(accounts) {
  it("should take 2 wei and put 1 into AccountA and 1 into AccountB", function() {
    var splitter = Splitter.deployed();
    var estimatedGas = 100000; //guess via splitter.contract.takeEther.estimateGas(function(e, r) { console.log(r); });
    return splitter.takeEther({
        from: web3.eth.coinbase,
        to: splitter.address,
        value: 2,
        gas: estimatedGas
    })
    .then(function(e, r) {
        var a_is_one = splitter.amountA().then(assertIsOne);
        var b_is_one = splitter.amountB().then(assertIsOne);
        return a_is_one && b_is_one;
    })
  });
  it("should receive another 2 wei and split correctly", function() {
    var splitter = Splitter.deployed();
    var estimatedGas = 100000;
    return splitter.takeEther({
        from: web3.eth.coinbase,
        to: splitter.address,
        value: 2,
        gas: estimatedGas
    })
    .then(function(e, r) {
        var a_is_one = splitter.amountA().then(assertIsTwo);
        var b_is_one = splitter.amountB().then(assertIsTwo);
        return a_is_one && b_is_one;
    })
  });
});
