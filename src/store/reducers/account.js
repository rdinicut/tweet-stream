import {
    ACCOUNT_CHANGED, ACCOUNT_REGISTER, ACCOUNT_REGISTERED, ACCOUNT_REGISTRATION_FAILED
} from "../actions/account";

const initialState = {
    ethAddress: "",
    registered: false,
    loading: false,
    name: "",
    error: null
};

export const accountReducer = (state = initialState, action) => {
    switch (action.type) {


        case ACCOUNT_CHANGED:
            return {
                ...state,
                loading:true,
                ethAddress: action.address
            };
        case ACCOUNT_REGISTER:
            return {
                ...state,
                loading: true
            }
        case ACCOUNT_REGISTERED:
            return {
                ...state,
                loading:false,
                name:action.name,
                registered: action.name !== ''
            }
        case ACCOUNT_REGISTRATION_FAILED:
            return {
                ...state,
                loading:false,
                error: action.error
            }

        default:
            return state;
    }
};
