function assertIsOne(value) {
	assert.equal(value, 1, subject+" doesn't seem to be one");
}


contract('Splitter', function(accounts) {
  var splitter = Splitter.deployed();
  it("should reveice 2 ether", function() {
    splitter.takeEther(2, {from: accounts[0]});
  });
  it("should have put 1 to account A", function() {
    return splitter.getBalance.call(accounts[0])
	.then(assertIsOne);
  });
  it("should have put 1 to account B ", function(){
    return splitter.getBalance.call(accounts[1])
	.then(assertIsOne); 
  });
});
