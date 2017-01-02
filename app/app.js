var accounts;
var account;
var balance;

function setStatus(message) {
  var status = document.getElementById("status");
  status.innerHTML = message;
};

function setBalance(value) {
    var balance_element = document.getElementById("balance");
    balance_element.innerHTML = value.valueOf();
}

function setAmountA(value) {
    var amountA_element = document.getElementById("amountA");
    amountA_element.innerHTML = value.valueOf();
}

function setAmountB(value) {
    var amountB_element = document.getElementById("amountB");
    amountA_element.innerHTML = value.ValueOf();
}

function setStatus(status_message) {
    console.log(e);
    setStatus(status_message);
}
    

function refreshView(which_account) {
  var splitter = Splitter.deployed();
  splitter.amountA.call()
    .then(setAmountA)
    .catch(setStatus)

  splitter.amountB.call()
    .then(setAmountB)
    .catch(setStatus)
};

function splitEther() {
  var splitter = Splitter.deployed();

  var amount = parseInt(document.getElementById("amount").value);

  setStatus("Initiating transaction... (please wait)");

  splitter.takeEther().then(function() {
    setStatus("Transaction complete!");
    refreshView();
  }).catch(function(e) {
    console.log(e);
    setStatus("Error splitting Ether; see log.");
  });
};

window.onload = function() {
  web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }

    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }

    accounts = accs;
    account = accounts[0];

    refreshView();
  });
}
