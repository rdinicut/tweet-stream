import * as tweetStreamConfig from '../contracts/TweetStream.json';

let TweetStream = null;

let selectedNetwork = null;
let supportedNetworks = Object.keys(tweetStreamConfig.networks);

export default class Contracts {
    constructor() {
        throw new Error("Do not instantiate!")
    }

    static getSupportedNetworks = () => {
        return supportedNetworks;
    };

    static setNetwork = (networkId) => {
        if (supportedNetworks.indexOf(networkId) < 0) {
            throw new Error(`No configuration defined for network:${networkId}. Application supports only ${supportedNetworks.join(',')}`)
        }
        selectedNetwork = networkId;
        let {web3} = window;

        // initialize contracts
        TweetStream = web3.eth.contract(tweetStreamConfig.abi).at(tweetStreamConfig.networks[selectedNetwork].address);
    };

    static TweetStream() {
        if (!TweetStream) throw new Error(`You must first define the network. Call Contract.setNetwork}`)
        return TweetStream;
    }

    static isTweetStreamBytecode(bytecode) {
        return tweetStreamConfig.deployedBytecode === bytecode;
    }

}


