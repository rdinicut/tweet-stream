import React, {Component} from 'react';
import {push} from "react-router-redux";
import {connect} from 'react-redux';
import Preloader from './Preloader';
import {Box, Button, Heading, TextInput, Stack, FormField} from "grommet";
import {registerAccount} from "../store/actions/account";
import Tweets from "./Tweets";

export class CheckRegistration extends Component {
    state = {text: ''}

    render() {
        const {
            loading,
            registerAccount,
            registered
        } = this.props;
        const {text} = this.state;
        return (
            <Box fill="true">
                {
                    loading ?
                        <Preloader label='Loading'/>
                        :
                        <React.Fragment>
                            { registered ?
                                <React.Fragment>
                                    { this.props.children }
                                </React.Fragment>
                                :
                                <Stack anchor='center' fill="true">
                                    <Box align='center' background="light-2" justify='center' pad='large' fill="true">
                                        <Box width="medium">
                                            <Heading level={1}>TweetStream</Heading>
                                            <FormField label='Name'>
                                                <TextInput
                                                    value={text}
                                                    onChange={event => this.setState({text: event.target.value})}
                                                />
                                            </FormField>

                                            <Button label='register' primary onClick={() => {
                                                this.setState({text: ''});
                                                registerAccount(text);
                                            }}/>
                                        </Box>
                                    </Box>
                                </Stack>
                            }
                        </React.Fragment>
                }
            </Box>
        );
    }
}


export default connect(
    state => ({
        loading: state.account.loading,
        registered: state.account.registered,
    }),
    {
        registerAccount
    }
)(CheckRegistration);
