import React, {Component} from 'react';
import {Box, Heading, Paragraph, Stack} from "grommet";

export class BrowserUnsupportedScreen extends Component {
  render() {
      return <Stack anchor='center' fill="true">
          <Box align='center' justify='center' pad='large' fill="true">
              <Heading level={1}>Your browser is not supported</Heading>
              <Paragraph>To access the Centrifuge OS you need to install Chrome, Firefox, Opera, or Brave</Paragraph>
          </Box>
      </Stack>
  }
}
