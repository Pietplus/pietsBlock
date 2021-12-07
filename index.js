//import hash function of the crypto package of nodeJS
const crypto = require("crypto"),SHA256 = message => crypto.createHash("SHA256").update(message).digest("hex");

class Block {
    constructor(timestamp = "",data = []) {
        this.timestamp = timestamp;
        // this.data should contain information like transactions.
        this.data = data;
    }
}

// create a hash function.
getHash = () => {
    return SHA256(this.prevHash + this.timestamp + JSON.stringify(this.data));
}

class Blockchain {
constructor() {
        // create a genesis Block
        this.chain = [new Block(Date.now().toString())];
    }
}

getLastBlock = () => {
    return this.chain[this.chain.length - 1];
}

addBlock = (block) => {
    // prevhash will be the hash of the latest block.
    block.prevHash = this.getLastBlock().hash;
    // reset the block hash value.
    block.hash = block.gethash();

    // Object.freeze ensures immutability.
    this.chain.push(Object.freeze(block));

}

// Validation

/* The chain is valid oif a block`s hash is equal to what its hashing method returns,
and a block`s prevHash property should be equal to the previous block`s hash.*/

isValid = (blockchain = this) => {
    // Iterate over the chain, we need to set i to 1. Be aware of the genesis Block.
    for(let i = 1; i < blockchain.chain.length;i++) {
            const currentBlock = blockchain.chain[i];
            const prevBlock = blockchain.chain[i-1];

            // check validation
        if(currentBlock.hash !== currentBlock.gethash() || prevBlock.hash !== currentBlock.prevhash) {
            return false;
        }
    }
    return true;
}



