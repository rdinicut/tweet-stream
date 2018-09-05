import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {accountReducer} from "./account";
import {ethereumReducer} from "./ethereum";
import {tweetsReducer} from "./tweets";

export const rootReducer = combineReducers({
  ethereum: ethereumReducer,
  account: accountReducer,
  tweets: tweetsReducer,
  router: routerReducer,
});

