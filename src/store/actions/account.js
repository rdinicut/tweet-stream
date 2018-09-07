// Actions for the metamask account
export const ACCOUNT_CHANGED = "ACCOUNT_CHANGED";
export const ACCOUNT_REGISTER = "ACCOUNT_REGISTER";
export const ACCOUNT_REGISTRATION_FAILED = "ACCOUNT_REGISTRATION_FAILED";
export const ACCOUNT_REGISTERED = "ACCOUNT_REGISTERED";

export const changeAccount = (address) => {
    return {
        type: ACCOUNT_CHANGED,
        address
    }
};

export const registerAccount = (name) => {
    return {
        type: ACCOUNT_REGISTER,
        name
    }
}

export const accountRegistered = (name) => {
    return {
        type:ACCOUNT_REGISTERED,
        name
    }
}

export const accountRegistrationFailed = (error) => {
    return {
        type:ACCOUNT_REGISTRATION_FAILED,
        error
    }
}





