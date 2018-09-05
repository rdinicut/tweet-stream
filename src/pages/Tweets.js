import {Box, Button, FormField, Heading, Stack, TextArea, Select, Grid, Paragraph} from "grommet";
import React, {Component} from "react";
import connect from "react-redux/es/connect/connect";
import {push} from "react-router-redux";
import {registerAccount} from "../store/actions/account";
import Preloader from "../components/Preloader";
import {loadAllTweets, submitTweet, subscribeToTweets, tweetReceived} from "../store/actions/tweets";
import {fromWeb3Callback} from "../utils/promise";
import Contracts from "../services/contracts";

export class Tweets extends Component {
    state = {message: '', mood: "0x1F35F"}

    moodOptions = ["0x1F604", "0x1F34A", "0x1F344", "0x1F37F", "0x1F363",  "0x1F355",
        "0x1F354", "0x1F35F", "0x1F6C0", "0x1F48E", "0x1F5FA", "0x23F0", "0x1F579", "0x1F4DA",
        "0x1F431", "0x1F42A", "0x1F439", "0x1F424"];

    componentDidMount() {
        const {web3} = window;
        this.props.loadAllTweets();
        fromWeb3Callback(cb => Contracts.TweetStream().newTweet().watch(cb))
            .subscribe(result => {
                const {message, mood, name} = result.args
                return this.props.tweetReceived(web3.toAscii(message), mood.replace(/[0]+$/,''), web3.toAscii(name));
            })
    }

    render() {
        const {
            loading,
            submitTweet,
            tweets,
            push
        } = this.props;

        const {message, mood} = this.state;

        return <Grid fill="true"
                     areas={[
                         {name: "left", start: [0, 0], end: [0, 0]},
                         {name: "right", start: [1, 0], end: [1, 0]}
                     ]}
                     columns={["flex", "flex"]}
                     rows={["fill"]}
                     gap="small"
        >
            {loading ?
                <Preloader/>
                :
                <React.Fragment>
                    <Stack gridArea="left" anchor='center' fill="true">
                        <Box align='center' justify='center' pad='large' fill="true">
                            <Heading level={1}>Submit a Tweet</Heading>
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
                                    onChange={({option}) => this.setState({mood: option})}
                                >
                                    {option => <span>{String.fromCodePoint(option)}</span>}
                                </Select>
                            </FormField>

                            <Button label='submit' primary onClick={() => {
                                submitTweet(message, mood);
                            }}/>
                        </Box>
                    </Stack>

                </React.Fragment>
            }
            <Box background="brand" fill="true" pad="medium">
                {tweets.map((tweet,index) => {
                    return <Box key={index} gap="small" direction="row" >
                        <Box round="medium" pad="medium" background="light-1">{tweet.name}</Box>
                        <Box round="medium" pad="medium"  background="light-1">{tweet.message}</Box>
                        <Box round="medium" pad="medium"  background="light-1">{String.fromCodePoint(tweet.mood)}</Box>
                    </Box>
                })}
            </Box>

        </Grid>


    }

}

export default connect(
    state => ({
        ethAddress: state.account.ethAddress,
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
