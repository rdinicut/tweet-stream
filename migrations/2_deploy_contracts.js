var TweetStream = artifacts.require("TweetStream");

module.exports = function (deployer) {
    deployer.deploy(TweetStream);
};
