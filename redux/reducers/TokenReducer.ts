import Actions from '../actions/index'
import jwt from 'jsonwebtoken'

const initState = {
    token: ''
}

const TokenReducer = (state=initState, action) => { 
    const { token } = action;
    switch (action.type) {  
        case Actions.TokenAction.CHECK_TOKEN:
            jwt.verify(token, 'secret', (err, decode) => {
                if(err === null) {
                    return {
                        ...state
                    }
                } else {
                    return {
                        ...state,
                        token: ''
                    }
                }
            });
        case Actions.TokenAction.ADD_TOKEN:
            return {
                ...state,
                token
            };
        default:
            return state;
    }
};

export default TokenReducer;