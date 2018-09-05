import React, {Component} from 'react';
import {Box, Heading, Paragraph, Stack, Button} from "grommet";


export class NetworkNotSupportedScreen extends Component {
    render() {
        const {currentNetwork, supportedNetworks} = this.props;
        return <Stack anchor='center' fill="true">
            <Box align='center' justify='center' pad='large' fill="true">
                <Heading level={1}>{`${currentNetwork} network is not supported`}</Heading>
                <Paragraph>{`You must switch one of the following networks: ${supportedNetworks.join(', ')}`}</Paragraph>
            </Box>
        </Stack>
    }
}

export class NetworkLoadingScreen extends Component {
    render() {
        return <Stack anchor='center' fill="true">
            <Box align='center' justify='center' pad='large' fill="true">
                <Paragraph>Checking network connection</Paragraph>
            </Box>
        </Stack>
    }
}

export class NetworkNotFoundScreen extends Component {
    render() {
        return <Stack anchor='center' fill="true">
            <Box align='center' justify='center' pad='large' fill="true">
                <Heading level={1}>Ethereum network not found</Heading>
                <Paragraph>Check your internet connection and you metamask and the reload the application</Paragraph>
                <Button label='Reload application' primary onClick={() => {
                    window.location.reload()
                }}/>
            </Box>
        </Stack>
    }
}




