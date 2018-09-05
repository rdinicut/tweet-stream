import 'rxjs';
import {combineEpics} from 'redux-observable';
import {ACCOUNT_CHANGED, ACCOUNT_REGISTER, accountRegistered, accountRegistrationFailed} from "../actions/account";
import Contracts from "../../services/contracts";
import {fromWeb3Callback} from "../../utils/promise";
import {Observable} from 'rxjs/Observable';

export const createAccountEpic = () => {
    return combineEpics(accountIsRegisterd,register);
};


const accountIsRegisterd = (action$) => {
    return action$.ofType(ACCOUNT_CHANGED)
        .switchMap( action => {
            return fromWeb3Callback(cb => Contracts.TweetStream().isSenderRegistered(cb))

        }).map( result => {
            console.log(result);
            return accountRegistered(result);
        } )
}


const register = (action$) => {
    return action$.ofType(ACCOUNT_REGISTER)
        .switchMap(action => {
            return fromWeb3Callback(cb => Contracts.TweetStream().register(action.name, cb))
                .switchMap(() => {
                    return fromWeb3Callback(
                        cb => Contracts.TweetStream().newUser().watch(cb)
                    )
                }).map((result) => accountRegistered(true))
                .catch(e => Observable.of(accountRegistrationFailed(e)))
        })
}


