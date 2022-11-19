import {
    GET_USERS,
    REGISTER,
    CHECK_AUTH,
    SIGNOUT,
    UPDATE,
    DELETE,
    FOLLOW,
    UNFOLLOW,
    USER_ERROR,
    TOGGLE_SUCCESS,
    AUTH,
    GET_FOLLOWERS,
    LIKE_UNLIKE_USER
} from '../../types/userTypes';


const initialState = {
    currentUser: null, 
    users:[],
    userError: null,
    userSuccess: false,
    
};


const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_USERS: 
            return {
            ...state,
            users: action.payload 
            };
        case AUTH:
            return {
                ...state, 
                currentUser: action.payload,
                userError: null,
                userSuccess: !state.userSuccess
            };
        case CHECK_AUTH:
            return {
                ...state, 
                currentUser: action.payload 
            };
        case SIGNOUT:
            return {
                ...state, 
                user: action.payload 
            };
        case REGISTER:
            return {
                ...state,
                userSuccess: !state.userSuccess,
            };
        case UPDATE:
            const jwt = JSON.parse(localStorage.getItem("jwt"));
            const newJwt = {...jwt, user: action.payload};
            localStorage.setItem("jwt", JSON.stringify(newJwt));
            return {
                ...state,
                currentUser:  {...state.currentUser, user: action.payload},
                userSuccess: !state.userSuccess,
            };
        case DELETE:
            const updatedUsers = state.users.filter(
                (user) => user._id !== action.payload._id);
            return {
                ...state, 
                users: updatedUsers,
                currentUser: null,
            };
        case FOLLOW:
            return {
                state
            };
        case UNFOLLOW:
            return {
                state
            };
        case LIKE_UNLIKE_USER:
            const newUpdatedUsers = Object.values(state.users).filter(
                (user) => {
                if (user._id === action.userId) {
                    user.likes = action.payload.likes;
                    return state.users;
                }
                return state.users;
            });
            return {
                ...state,
                users: newUpdatedUsers,
            }
        case USER_ERROR:
            return {
                ...state,
                userError: action.payload 
            };
        case TOGGLE_SUCCESS:
            return {
               ...state, 
               userSuccess: !state.userSuccess,
            };
        case GET_FOLLOWERS:
            return {
                ...state, 
                userSuccess: !state.userSuccess,
                users: action.payload 
            };
        default: 
        return state;
    }
}


export default userReducer;