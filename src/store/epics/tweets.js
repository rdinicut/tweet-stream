import 'rxjs';
import {combineEpics} from 'redux-observable';
import Contracts from "../../services/contracts";
import {fromWeb3Callback} from "../../utils/promise";
import {Observable} from 'rxjs/Observable';
import {
    TWEET_SUBMIT,
    tweetFailed,
    tweetReceived,
    tweetSubmited,
    TWEETS_LOAD_ALL, loadingAllTweetsFailed, loadingAllTweetsSuccess
} from "../actions/tweets";
import {ACCOUNT_REGISTER} from "../actions/account";

export const createTweetsEpic = () => {
    return combineEpics(submitTweet, getAllTweets);
};

const submitTweet = (action$) => {
    return action$.ofType(TWEET_SUBMIT)
        .switchMap(action => {
            return fromWeb3Callback(cb => Contracts.TweetStream().tweet(action.message, action.mood, cb))
                .switchMap(() => {
                    return fromWeb3Callback(cb => Contracts.TweetStream().newTweet({
                            message: action.message,
                            mood: action.mood
                        }).watch(cb))
                }).map(tweetSubmited)
                .catch(e => Observable.of(tweetFailed(e)))
        })
}

const getAllTweets = (action$) => {
    return action$.ofType(TWEETS_LOAD_ALL)
        .switchMap(action => {
            return fromWeb3Callback(
                cb => Contracts.TweetStream().newTweet({},{fromBlock: 0, toBlock: 'latest'}).get(cb)
            ).map(results => {
                const {web3} = window;
                const tweets = results.map((item) => {
                    const {message, mood, name} = item.args;
                    return {message: web3.toAscii(message), mood: mood.replace(/[0]+$/,''), name: web3.toAscii(name)};
                })
                return loadingAllTweetsSuccess(tweets)
            })
                .catch(e => Observable.of(loadingAllTweetsFailed(e)))
        })
}

