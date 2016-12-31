
contract Splitter {
    address accountA;
    address accountB;

    uint amountA;
    uint amountB;

    event EtherSplit(address from, uint amount,  uint split_for_A, uint split_for_B);

    function takeEther() {
        address A = 0xd53489dc66c584fd1f16e4fe40417131e7f307d7;
        address B = 0xb0d6bac57f0c160f216e65021b0a1f7414a47f16;
        uint forA = msg.value/2;
        uint forB = msg.value - forA;        
        amountA += forA;
        amountB += forB;
        if (!A.send(forA)) { throw; } 
        if (!B.send(forB)) { throw; }
        EtherSplit(msg.sender, msg.value, forA, forB); 
    }

    function getBalanceA() returns(uint) {
        return amountA;
    }

    function getBalanceB() returns(uint) {
        return amountB;
    }
}
