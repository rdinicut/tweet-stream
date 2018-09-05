import React, {Component} from 'react';
import {Heading, Stack, Box, Paragraph} from 'grommet';


export class AccountUnvailableScreen extends Component {
    render() {
        return <Stack anchor='center' fill="true">
            <Box align='center' justify='center' pad='large' fill="true">
                <Heading level={1}>Your Metamask is locked</Heading>
                <Paragraph>Simply open Metamask and follow the instructions to unlock it.</Paragraph>
            </Box>
        </Stack>
    }
}

export class AccountLoadingScreen extends Component {
    render() {
        return <Stack anchor='center' fill="true">
            <Box align='center' justify='center' pad='large' fill="true">
                <Paragraph>Checking account information</Paragraph>
            </Box>
        </Stack>
    }

}
