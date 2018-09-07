import {Box, Button, FormField, Heading, Text, TextArea, Select, Grid, Paragraph} from "grommet";
import React, {Component} from "react";
import connect from "react-redux/es/connect/connect";
import {push} from "react-router-redux";
import {registerAccount} from "../store/actions/account";
import Preloader from "./Preloader";
import {loadAllTweets, submitTweet, subscribeToTweets, tweetReceived} from "../store/actions/tweets";
import {fromWeb3Callback} from "../utils/promise";
import Contracts from "../services/contracts";

export class Tweets extends Component {

    tweetsSubscription = null;
    moodOptions = ["0x1F604", "0x1F34A", "0x1F344", "0x1F37F", "0x1F363", "0x1F355",
        "0x1F354", "0x1F35F", "0x1F6C0", "0x1F48E", "0x1F5FA", "0x1F579", "0x1F4DA",
        "0x1F431", "0x1F42A", "0x1F439", "0x1F424"];

    getDefaultState = () => {
        return {
            message: "",
            mood: this.moodOptions[Math.floor(Math.random() * this.moodOptions.length)]
        }
    }
    state = this.getDefaultState();

    componentDidMount() {
        const {web3} = window;
        this.props.loadAllTweets();
        this.tweetsSubscription = fromWeb3Callback(cb => Contracts.TweetStream().newTweet().watch(cb))
            .subscribe(result => {
                const {message, mood, name} = result.args
                return this.props.tweetReceived(web3.toAscii(message), mood.replace(/[0]+$/, ''), web3.toAscii(name));
            })
    }

    componentWillUnmount() {
        console.error('Unscubscribe!')
        this.tweetsSubscription.unsubscribe();
    }

    render() {
        const {
            loading,
            loadingAllTweets,
            submitTweet,
            tweets,
            push,
            name
        } = this.props;

        const {message, mood} = this.state;

        return <Grid fill="true"
                     areas={[
                         {name: "left", start: [0, 0], end: [0, 0]},
                         {name: "right", start: [1, 0], end: [1, 0]}
                     ]}
                     columns={["flex", "flex"]}
                     rows={["fill"]}
                     gap="small">
            {loading ?
                <Preloader label="Sending tweet"/>
                :
                <React.Fragment>

                    <Box gridArea="left" align='center' justify='center' pad='medium' fill="true">
                        <Box width="medium" justify='center'>
                            <Heading align="center" level={2}>Hi {name}!</Heading>
                            <FormField label='Message'>
                                    <TextArea
                                        value={message}
                                        onChange={event => this.setState({message: event.target.value})}
                                    />
                            </FormField>

                            <FormField label="Mood">
                                <Select
                                    a11yTitle='Select Mood'
                                    activeOptionIndex={
                                        mood ? this.moodOptions.indexOf(mood) + 1 : undefined
                                    }
                                    placeholder='Select mood'
                                    options={this.moodOptions}
                                    value={String.fromCodePoint(mood)}
                                    onChange={({option}) => this.setState({mood: option})}>
                                    {option => <span>{String.fromCodePoint(option)}</span>}
                                </Select>
                            </FormField>

                            <Button label='Send tweet' primary onClick={() => {
                                this.setState(this.getDefaultState());
                                submitTweet(message, mood);
                            }}/>
                        </Box>
                    </Box>


                </React.Fragment>
            }
            <Box background="brand" height="" flex="false" overflow="auto" pad="medium">
                {loadingAllTweets ?
                    <Preloader label="Loading tweets" color="white"/>
                    :
                    <div>{/* We need a block for scrolling*/}
                        {tweets.map((tweet, index) => {
                            return <Box key={tweets.length - index} gap="small" direction="row" margin="xsmall"
                                        animation={{type: "fadeIn", duration: 500}}>
                                <Box justify='center' round="full" pad="medium" background="light-1">
                                    {String.fromCodePoint(tweet.mood)}
                                </Box>
                                <Box round="medium" pad="medium" background="light-1">
                                    <Text><b>{tweet.name} says</b> : {tweet.message}</Text>
                                </Box>
                            </Box>
                        })}
                    </div>
                }

            </Box>

        </Grid>


    }

}

export default connect(
    state => ({
        loadingAllTweets: state.tweets.loadingAllTweets,
        loading: state.tweets.loading,
        tweets: state.tweets.items,
        name: state.account.name,
    }),
    {
        push,
        submitTweet,
        tweetReceived,
        loadAllTweets
    }
)(Tweets);
