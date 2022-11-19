import {
    GET_USERS,
    AUTHENTICATION,
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
} from '../types/userTypes';
import axios from 'axios';
import { saveUserToLocalStorage, isLogged } from './../../auth';




export const getAllUsers = (token) => {
    return (dispatch) => {
        axios
        .get("http://localhost:5050/users/allusers")
        .then(res => {
            if (res.data.error) {
                dispatch({
                    type: USER_ERROR,
                    payload: res.data.error
                })
            } else {
                dispatch({
                    type: GET_USERS,
                    payload: res.data
                });
            }
        })
        .catch(err=> console.log(err))
    };

}


export const signup = (user) => {
    return (dispatch) => {
        axios
        .post("http://localhost:5050/auth/signup", user)
        .then(res => {
            if (res.data.error) {
                dispatch({
                    type: USER_ERROR,
                    payload: res.data.error
                })
            } else {
                dispatch({
                    type: REGISTER,
                    payload: res.data
                });
                console.log(res.data);
            }
        })
        .catch(err=> console.log("eeeee", err))
    };
};



export const signin = (user) => {
    return (dispatch) => {
        axios
        .post("http://localhost:5050/auth/signin", user)
        .then(res => {
            if (res.data.error) {
                dispatch({
                    type: USER_ERROR,
                    payload: res.data.error
                })
            } else {
                saveUserToLocalStorage(res.data);
                dispatch({
                    type: AUTH,
                    payload: res.data
                });
            }
        })
        .catch(err=> console.log("err", err))

    };

};


export const authCheck = () => {
    return dispatch => {
        dispatch({
            type: CHECK_AUTH,
            payload: isLogged() ? isLogged() : null,
        });
    };
};



export const getUser = (userId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    return axios.get(`http://localhost:5050/users/user/${userId}`, config)
        .then((res) => {
            if (res.data.error) {
                return {error: res.data.error };
            } else {
              return {data: res.data};  
            }
        })
        .catch((err) => console.log(err));
};


export const remove = (userId, token ) => {
    return fetch(`http://localhost:5050/user/${userId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    .then(res => {
        return res.json();
    })
    .catch(error => console.log(error))
};



export const subscribe = (userId, followId, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    };
    return axios
    .put(`http://localhost:5050/users/user/follow`, {userId, followId}, config)
    .then((res) => {
        if(res.data.error) {
            return { error: res.data.error};
        } else {
            return { data: res.data}
        }
    })
    .catch((err) => console.log(err));

};


export const unsubscribe = (userId, followId, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    };
    return axios
    .put(`http://localhost:5050/users/user/unfollow`, {userId, followId}, config)
    .then((res) => {
        if(res.data.error) {
            return { error: res.data.error};
        } else {
            return { data: res.data}
        }
    })
    .catch((err) => console.log(err));

};




export const updateUser = (user, token, userId) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        },  
    };
    return (dispatch) => {
        axios
        .put(`http://localhost:5050/users/user/${userId}`, user, config)
        .then((res) => {
            if (res.data.error) {
                dispatch({
                    type: USER_ERROR,
                    payload: res.data.error
                })
            } else {
                dispatch({
                    type: UPDATE,
                    payload: res.data,
                    
                });
                console.log(res.data);
            }
        }).catch(err=> console.log(err))
    };
};



export const deleteUser = (userId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    return (dispatch) => {
        axios.delete(`http://localhost:5050/users/user/${userId}`, config)
        .then((res) => {
            console.log(res.data);
            if (res.data.error) {
                dispatch({
                    type: USER_ERROR,
                    payload: res.data.error,
                })
            } else {
                dispatch({
                    type: DELETE,
                    payload: userId,
                });
            }
        })
        .catch((err) => console.log(err));
    }
};



export const getFollowers = (userId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    return axios.get(`http://localhost:5050/users/user/followers/${userId}`, config)
    .then((res) => {
        if (res.data.error) {
            return {error: res.data.error };
        } else {
          return {data: res.data};  
        }
    })
    .catch((err) => console.log(err));
};




