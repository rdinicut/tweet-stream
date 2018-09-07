import React,{Component} from "react";
import CheckRegistration from "../components/CheckRegistration";
import Tweets from "../components/Tweets";

export class HomePage extends Component{
    render() {
        return <CheckRegistration>
            <Tweets/>
        </CheckRegistration>
    }

}
