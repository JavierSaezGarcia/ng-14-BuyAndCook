import { User } from '../user.model';
import * as authAct from './auth.actions';

export interface State {
    user: User;
}


const initialState = {
    user: null
}

export function authReducer( 
    state = initialState , 
    action: authAct.AuthActions
    ) {
       
    switch( action.type ) {
        case authAct.LOGIN:
            const user = new User(
                action.payload.email, 
                action.payload.userId,
                action.payload.token,
                action.payload.expirationDate
                );
            return {
                ...state,
                user: user
            };
        
        case authAct.LOGOUT:
            return {
                ...state,
                user:null
            };
        default:
            return state;


    }
}