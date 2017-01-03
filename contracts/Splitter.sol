pragma solidity ^0.4.2;

contract Splitter {
    address public accountA;
    address public accountB;

    uint public amountA;
    uint public amountB;

    event EtherSplit(address from, uint amount,  uint split_for_A, uint split_for_B);

    function Splitter(address addrA, address addrB) {
        accountA = addrA;
        accountB = addrB;
    }

    function takeEther() payable {
        uint forA = msg.value/2;
        uint forB = msg.value - forA;        
        amountA += forA;
        amountB += forB;
        if (!accountA.send(forA)) { throw; } 
        if (!accountB.send(forB)) { throw; }
        EtherSplit(msg.sender, msg.value, forA, forB); 
    }
}
