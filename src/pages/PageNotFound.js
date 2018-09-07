import React, {Component} from 'react';
import {Box, Button, Heading, Paragraph, Stack} from "grommet";

export class PageNotFound extends Component {

    render() {
        return (
            <Stack anchor='center' fill="true">
                <Box align='center' justify='center' pad='large' fill="true">
                    <Heading level={1}>404</Heading>
                </Box>
            </Stack>
        );
    }
}

