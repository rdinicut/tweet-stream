import 'rxjs';
import {combineEpics} from 'redux-observable';
import {ACCOUNT_CHANGED, ACCOUNT_REGISTER, accountRegistered, accountRegistrationFailed} from "../actions/account";
import Contracts from "../../services/contracts";
import {fromWeb3Callback} from "../../utils/promise";
import {Observable} from 'rxjs/Observable';

export const createAccountEpic = () => {
    return combineEpics(accountIsRegisterd,register);
};

const {web3} = window;

const accountIsRegisterd = (action$) => {
    return action$.ofType(ACCOUNT_CHANGED)
        .mergeMap( action => {
            return fromWeb3Callback(cb => Contracts.TweetStream().getUserName(action.address,cb)).map( result => {
                return accountRegistered(web3.toAscii(result).replace(/\u0000/g, ''));
            })
        })
}


const register = (action$) => {
    return action$.ofType(ACCOUNT_REGISTER)
        .mergeMap(action => {
            return fromWeb3Callback(cb => Contracts.TweetStream().register(action.name, cb))
                .mergeMap(() => {
                    return fromWeb3Callback(
                        cb => Contracts.TweetStream().newUser().watch(cb)
                    ).map(evt => web3.toAscii(evt.args.name).replace(/\u0000/g, ''))
                }).map((name) => accountRegistered(name))
                .catch(e => Observable.of(accountRegistrationFailed(e)))
        })
}


