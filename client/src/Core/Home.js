import React, { useState, useEffect } from 'react';
import {Redirect} from 'react-router-dom';
import { useDispatch, connect } from 'react-redux';
import { isLogged } from './../auth';
import './Home.css';
import { signin } from './../redux/actions/userActions';
import { Link } from 'react-router-dom';
import AllPosts from './../posts/AllPosts';

import {
    TOGGLE_SUCCESS
} from './../redux/types/userTypes.js';

import LoginLogo from './../images/login.svg';
import { isAuthenticated } from '../auth/index';
import Signin from '../user/Signin';



function Home({ userError, userSuccess }) {
    const jwt = isLogged();
    const dispatch = useDispatch();

    const[ user, setUser ] = useState({
        email: "",
        password: ""
    });

    const {email, password} = user;

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);


    useEffect(() => {
        if ( userError && userError !== null ) {
            setError(userError);
        }
        if(userSuccess) {
            setSuccess(userSuccess);
            dispatch({type: TOGGLE_SUCCESS})
        }
    }, [userError, userSuccess, dispatch]);

    function showError() {
        return error && <div className="alert alert-danger">{error}</div>
    };


    function redirectUser(){
        return success && <Redirect to="/"></Redirect>

    };


    function handleInputChange(event) {
        setUser({...user, [event.target.name]: event.target.value});
    };
    

    function handleFormSubmit(event){
        event.preventDefault();
        dispatch(signin(user))
    };

    return (
        <>
            {!isAuthenticated() ? (<Signin/>) : (<AllPosts/>)}
        </>
    )

};

const mapStateToProps = ({user: {userError, userSuccess}}) => ({
    userError,
    userSuccess

});



export default connect(mapStateToProps, null)(Home);