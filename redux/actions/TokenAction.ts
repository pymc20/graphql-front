export const CHECK_TOKEN = 'CHECK_TOKEN'; 
export const ADD_TOKEN = 'ADD_TOKEN'; 

export const checkTokenAction = (token) => ({ 
    type : CHECK_TOKEN,
    token
});

export const addTokenAction = (token) => ({ 
    type : ADD_TOKEN,
    token
});


export default {
    CHECK_TOKEN,
    ADD_TOKEN,
    checkTokenAction,
    addTokenAction
}