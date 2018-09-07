import 'rxjs';
import {combineEpics} from 'redux-observable';

import {Observable} from 'rxjs/Observable';
import {
    connectionToContractsFailed,
    connectionToContractsSuccesful,
    ETH_CONNECT_TO_CONTRACTS
} from "../actions/ethereum";
import Contracts from "../../services/contracts";
import {fromWeb3Callback, promisify} from "../../utils/promise";

export const createEthereumEpic = () => {
    return combineEpics(connect);
};

const connect = (action$, store) => {
    return action$.ofType(ETH_CONNECT_TO_CONTRACTS).switchMap((action) => {

        let {web3} = window;
        Contracts.setNetwork(action.networkId);
        return Observable.forkJoin(
            fromWeb3Callback(cb => web3.eth.getCode(Contracts.TweetStream().address, cb))
        ).map(contracts => {
            // Check received bytecodes here
            if (!Contracts.isTweetStreamBytecode(contracts[0]))
                throw new Error('Contract byte code does not match');
            return contracts;
        })
    })
        .map(connectionToContractsSuccesful)
        .catch(e => Observable.of(connectionToContractsFailed(e)));
};



