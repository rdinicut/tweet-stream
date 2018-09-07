import React, {Component} from 'react';
import {Box, Heading, Paragraph, Stack, Button} from "grommet";

export class Web3UnvailableScreen extends Component {
    render() {
        return <Box align='center' justify='center' pad='large' fill="true">
            <Heading level={1}>No connection to Ethereum</Heading>
            <Paragraph>You will need a way to connect and interact with Ethereum through the Browser. The perfect way is
                Metamask.</Paragraph>
            <Button label='Install Metamask' primary onClick={() => {
                window.open("https://metamask.io", "_blank")
            }}/>
            <Paragraph
                dangerouslySetInnerHTML={{__html: 'or <a rel="noopener noreferrer" href="https://consensys.zendesk.com/hc/en-us/categories/360000441452-Using-MetaMask" target="_blank">learn more</a> about Metamask'}}/>
        </Box>
    }
}
