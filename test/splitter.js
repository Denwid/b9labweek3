function assertIsOne(value) {
        console.log(value);
	assert.equal(value, 1, subject+" doesn't seem to be one");
}


contract('Splitter', function(accounts) {
  it("should reveice 2 ether and put 1 into AccountA and 1 into AccountB", function() {
    var splitter = Splitter.deployed();
    splitter.takeEther(2);
    splitter.getBalanceA.call().then(assertIsOne);
    splitter.getBalanceB.call().then(assertIsOne);
  });
});
