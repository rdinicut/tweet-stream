var path = require('path');
module.exports = {
    build_directory: path.join(__dirname, "src/"),
    contracts_build_directory: path.join(__dirname, "src/contracts/"),
    networks: {
      development: {
        host: "localhost",
        port: 8545,
        network_id: "*", // Match any network id
        from: "0xd77c534aed04d7ce34cd425073a033db4fbe6a9d",
        gas: 4712388
      },
      rinkeby: {
        host: "localhost",
        port: 9545,
        network_id: "4", // rinkeby network ID
        from: "0x44a0579754d6c94e7bb2c26bfa7394311cc50ccb", // default address to use for any transaction Truffle makes during migrations
        gas: 4612388 // Gas limit used for deploys
      }
    }
};
