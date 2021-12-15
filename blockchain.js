//import hash function of the crypto package of nodeJS
const crypto = require("crypto"), SHA256 = message => crypto.createHash("sha256").update(message).digest("hex");

class Block {
    constructor(timestamp = Date.now().toString(), data = []) {
        this.timestamp = timestamp;
        this.data = data;
         // this.data should contain information like transactions.
        this.prevHash = "";
        this.hash = this.getHash();
        this.nonce = 0;
    }

// create a hash function.
    getHash() {
        return SHA256(this.prevHash + this.timestamp + JSON.stringify(this.data) + this.nonce);
    }

    mine(difficulty) {
        while (!this.hash.startsWith(Array(difficulty + 1).join("0"))) {
            this.nonce++;
            this.hash = this.getHash();
        }
    }
}

// create a genesis Block
class Blockchain {
    constructor() {
        this.chain = [new Block()];
        this.difficulty = 1;
        this.blockTime = 30000;
    }

    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(block) {
// prevhash will be the hash of the latest block.

        block.prevHash = this.getLastBlock().hash;

// reset the block hash value.
        block.hash = block.getHash();
        block.mine(this.difficulty);
// Object.freeze ensures immutability.
        this.chain.push(Object.freeze(block));
        this.difficulty += Date.now() - parseInt(this.getLastBlock().timestamp) < this.blockTime ? 1 : -1;
}

// Validation

/* The chain is valid oif a block`s hash is equal to what its hashing method returns,
and a block`s prevHash property should be equal to the previous block`s hash.*/

    isValid() {
        // Iterate over the chain, we need to set i to 1. Be aware of the genesis Block.
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const prevBlock = this.chain[i-1];
            
// check validation
            if (currentBlock.hash !== currentBlock.getHash() || prevBlock.hash !== currentBlock.prevHash) {
                return false;
            }
        }

        return true;
    }
}
const pietChain = new Blockchain();
module.exports = { Block, Blockchain, pietChain };