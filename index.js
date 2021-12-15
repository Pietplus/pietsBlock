const { Block,Blockchain,pietChain } = require("./blockchain.js")

// Add a new block
pietChain.addBlock(new Block(Date.now().toString(), { from: "John", to: "Bob", amount: 100 }));
// The tutorial tells me that this is just a simple example and real cryptos are more complex to implement. cr

console.log(pietChain.chain);