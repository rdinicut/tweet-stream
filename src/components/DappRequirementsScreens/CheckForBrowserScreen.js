import React, {Component} from 'react';
import {Box, Heading, Paragraph, Stack} from "grommet";

export class BrowserUnsupportedScreen extends Component {
    render() {
        return <Box align='center' justify='center' pad='large' fill="true">
            <Heading level={1}>Your browser is not supported</Heading>
            <Paragraph>To access the application you need to install Chrome, Firefox, Opera, or Brave</Paragraph>
        </Box>
    }
}
