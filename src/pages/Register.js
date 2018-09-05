import React, {Component} from 'react';
import {push} from "react-router-redux";
import {connect} from 'react-redux';
import Preloader from '../components/Preloader';
import {Box, Button, Heading, TextInput, Stack, FormField} from "grommet";
import {registerAccount} from "../store/actions/account";
import Tweets from "./Tweets";

export class Register extends Component {
    state = {text: ''}

    render() {
        const {
            ethAddress,
            loading,
            registerAccount,
            registered,
            push
        } = this.props;
        const {text} = this.state;
        return (
            <React.Fragment>
                {
                    loading ?
                        <Preloader/>
                        :
                        <React.Fragment>
                            { registered ?
                                <Tweets/>
                                :
                                <Stack anchor='center' fill="true">
                                    <Box align='center' justify='center' pad='large' fill="true">
                                        <Heading level={1}>Register</Heading>
                                        <FormField label='Name'>
                                            <TextInput
                                                value={text}
                                                onChange={event => this.setState({text: event.target.value})}
                                            />
                                        </FormField>

                                        <Button label='register' primary onClick={() => {
                                            registerAccount(text);
                                        }}/>
                                    </Box>
                                </Stack>
                            }
                        </React.Fragment>
                }
                {/*<Preloader/>*/}

            </React.Fragment>
        );
    }
}


export default connect(
    state => ({
        ethAddress: state.account.ethAddress,
        loading: state.account.loading,
        registered: state.account.registered,
        name: state.account.name,
    }),
    {
        push,
        registerAccount
    }
)(Register);
