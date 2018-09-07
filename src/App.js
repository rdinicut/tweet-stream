import React, {Component} from 'react';
import {Route, Switch} from 'react-router';
import {ConnectedRouter, routerMiddleware} from 'react-router-redux'
import createHistory from 'history/createBrowserHistory';
import {applyMiddleware, compose, createStore} from "redux";
import {rootReducer} from "./store/reducers/index";
import {rootEpic} from "./store/epics/index";
import {createEpicMiddleware} from 'redux-observable';
import {Provider} from "react-redux";
import {changeAccount} from "./store/actions/account";
import Contracts from "./services/contracts";
import {connectToContracts} from "./store/actions/ethereum";
import {Box, Grommet} from "grommet";
import {PageNotFound} from "./pages/PageNotFound";
import {DappRequirements} from "react-dapp-requirements";
import {AccountLoadingScreen, AccountUnvailableScreen} from "./components/DappRequirementsScreens/CheckAccountScreens";
import {Web3UnvailableScreen} from "./components/DappRequirementsScreens/CheckWeb3Screens";
import {
    NetworkLoadingScreen, NetworkNotFoundScreen,
    NetworkNotSupportedScreen
} from "./components/DappRequirementsScreens/CheckForNetworkScreens";
import {BrowserUnsupportedScreen} from "./components/DappRequirementsScreens/CheckForBrowserScreen";
import {HomePage} from "./pages/HomePage";

const history = createHistory();

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(createEpicMiddleware(rootEpic)),
        applyMiddleware(routerMiddleware(history)),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
    )
);

export default class App extends Component {

    onNetworkIdReceived = (networkId) => {
        if (networkId)
            store.dispatch(connectToContracts(networkId));
    };

    onAccountChange = (address) => {
        if (address)
            store.dispatch(changeAccount(address))
    };

    render() {
        return (
            <Provider store={store}>
                <Grommet full={true}>
                    <Box background="light-1" fill="true">
                        <ConnectedRouter history={history}>
                            <Switch>
                                {/* routes that not require  metamask or other dapp requirements */}
                                <Route exact path="/" render={() => {
                                    return (
                                        <DappRequirements
                                            Web3UnvailableComponent={Web3UnvailableScreen}
                                            BrowserUnsupportedComponent={BrowserUnsupportedScreen}
                                            AccountLoadingComponent={AccountLoadingScreen}
                                            AccountUnvailableComponent={AccountUnvailableScreen}
                                            NetworkNotSupportedComponent={NetworkNotSupportedScreen}
                                            NetworkLoadingComponent={NetworkLoadingScreen}
                                            NetworkNotFoundComponent={NetworkNotFoundScreen}
                                            supportedNetworks={Contracts.getSupportedNetworks()}
                                            onNetworkIdReceived={this.onNetworkIdReceived}
                                            onAccountChange={this.onAccountChange}
                                        >
                                            <Switch>
                                                {/* routes that require metamask */}
                                                <Route exact path="/" component={HomePage}/>
                                            </Switch>
                                        </DappRequirements>
                                    )
                                }}/>
                                <Route path="*" component={PageNotFound}/>
                            </Switch>

                        </ConnectedRouter>
                    </Box>
                </Grommet>
            </Provider>

        );
    }
}
