import {
    TWEET_RECEIVED,
    TWEET_SUBMIT,
    TWEET_SUBMIT_SUCCESS,
    TWEETS_LOAD_ALL, TWEETS_LOAD_ALL_FAILED, TWEETS_LOAD_ALL_SUCCESS,
    TWEET_SUBMIT_FAILED
} from "../actions/tweets";

const initialState = {
    loading: false,
    error: null,
    loadingAllTweets: false,
    allTweetsError: null,
    items: []
};
//TODO think of spliting up tweet reducer
export const tweetsReducer = (state = initialState, action) => {
    switch (action.type) {

        case TWEET_SUBMIT:
            return {
                ...state,
                error: null,
                loading: true,
            }

        case TWEET_SUBMIT_SUCCESS:
            return {
                ...state,
                loading: false,
            }
        case TWEET_SUBMIT_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case TWEET_RECEIVED:
            return {
                ...state,
                items: [
                    ...state.items,
                    {
                        message: action.message,
                        mood: action.mood,
                        name: action.name
                    }
                ]
            };
        case TWEETS_LOAD_ALL:
            return {
                ...state,
                loadingAllTweets: true,
                allTweetsError: null,
            };
        case TWEETS_LOAD_ALL_SUCCESS:
            return {
                ...state,
                loadingAllTweets: false,
                items: [
                    ...action.items,
                    ...state.items,
                ]
            };
        case TWEETS_LOAD_ALL_FAILED:
            return {
                ...state,
                loadingAllTweets: false,
                allTweetsError: action.error
            };
        default:
            return state;
    }
};
