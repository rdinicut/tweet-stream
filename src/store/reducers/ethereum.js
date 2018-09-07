import {
    ETH_CHANGE_NETWORK,
    ETH_CONNECT_TO_CONTRACTS,
    ETH_CONTRACTS_CONNECTION_FAILED,
    ETH_CONTRACTS_CONNECTION_SUCCESSFUL
} from "../actions/ethereum";


const INITIAL_STATE = {
    networkId: null,
    connected: false,
    loading: false,
    error: null,
};

export const ethereumReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case ETH_CONNECT_TO_CONTRACTS:
            return {
                ...state,
                loading: true,
                networkId: action.networkId
            };

        case ETH_CONTRACTS_CONNECTION_SUCCESSFUL:
            return {
                ...state,
                connected: true,
                error: null,
                loading: false
            };

        case ETH_CONTRACTS_CONNECTION_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            };

        default:
            return state;
    }
};




