import React, {Component} from "react";
import styled from "styled-components";
import {Box, Heading, Paragraph, Stack} from "grommet";

class Preloader extends Component {
    render() {
        return <div className={this.props.className}>

            <Box align='center' justify='center' pad='large' fill="true">
                <svg id='L9' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>
                    <path fill='{this.props.theme.global.colors.brand}'
                          d='M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50'>
                        <animateTransform attributeName='transform' attributeType='XML' type='rotate'
                                          dur='1s' from='0 50 50' to='360 50 50' repeatCount='indefinite'/>
                    </path>
                </svg>
            </Box>


        </div>
    }
}

export default styled(Preloader)`
    width:100%;
    height:100%
    svg {
        width:80px;
        height:80px;
    }
`;
