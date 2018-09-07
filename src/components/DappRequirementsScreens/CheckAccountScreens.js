import React, {Component} from 'react';
import {Heading, Text, Box} from 'grommet';

export class AccountUnvailableScreen extends Component {
    render() {
        return <Box align='center' justify='center' pad='large' fill="true">
            <Heading level={1}>Your Metamask is locked</Heading>
            <Text>Simply open Metamask and follow the instructions to unlock it.</Text>
        </Box>
    }
}

export class AccountLoadingScreen extends Component {
    render() {
        return <Box align='center' justify='center' fill="true">
                <Text>Checking account information</Text>
        </Box>
    }

}
