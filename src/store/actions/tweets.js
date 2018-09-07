export const TWEET_SUBMIT = "TWEETS_SUBMIT";
export const TWEET_SUBMIT_SUCCESS = "TWEET_SUBMIT_SUCCESS";
export const TWEET_SUBMIT_FAILED = "TWEET_SUBMIT_FAILED";

export const TWEET_RECEIVED = "TWEET_RECEIVED";

export const TWEETS_LOAD_ALL = "TWEETS_LOAD_ALL"
export const TWEETS_LOAD_ALL_SUCCESS = "TWEETS_LOAD_ALL_SUCCESS"
export const TWEETS_LOAD_ALL_FAILED = "TWEETS_LOAD_ALL_FAILED"

export const submitTweet = (message,mood) => {
    return {
        type: TWEET_SUBMIT,
        message,
        mood
    }
}

export const tweetSubmited = () => {
    return {
        type: TWEET_SUBMIT_SUCCESS
    }
}

export  const tweetFailed = (error) => {
    return {
        type: TWEET_SUBMIT_FAILED,
        error
    }
}

export const tweetReceived = (message, mood, name) => {
    return {
        type: TWEET_RECEIVED,
        message,
        mood,
        name
    }
}

export const loadAllTweets = () => {
    return {
        type: TWEETS_LOAD_ALL
    }
}

export const loadingAllTweetsSuccess = (items) => {
    return {
        type: TWEETS_LOAD_ALL_SUCCESS,
        items
    }
}

export const loadingAllTweetsFailed = (error) => {
    return {
        type: TWEETS_LOAD_ALL_FAILED,
        error
    }
}


