import React, { useState, useEffect } from 'react';
import {Redirect} from 'react-router-dom';
import { useDispatch, connect } from 'react-redux';
import { signin } from './../redux/actions/userActions';
import { Link } from 'react-router-dom';
import './css/Signin.css';

import {
    TOGGLE_SUCCESS
} from '../redux/types/userTypes';

import LoginLogo from './../images/login.svg';


function Signup ({ userError, userSuccess }) {
    const[ user, setUser ] = useState({
        email: "",
        password: ""
    });

    const dispatch = useDispatch();

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
        dispatch(signin(user));
    };




    return (
        <div className='main_intro'>
            <div className='intro'>
                <h1>Welcome to social media</h1> 
                <p>The best place to make new friends</p>
                <p>Get to know about what is going on in the web</p>
            </div>   
            <div className="signin_container">

            {showError()}

            {redirectUser()}

            {error && (error !== null || error !== "" || error !== {}) && (
            <div>Something went wrong...</div>
            )}        
                <div className='img_container'>
                    <img src={LoginLogo} alt="login_logo"></img>
                </div>
                <div className='form_container'>
                    <form className='form'> 
                        <div className="form-group">
                            <label className="text-muted">Email</label>
                            <input 
                            onChange={(event)=> handleInputChange(event)} 
                            type="email" 
                            name= "email"
                            required
                            className="form-control"
                            value={email}></input>
                        </div>

                        <div className="form-group">
                            <label className="text-muted">Password</label>
                            <input 
                            onChange={(event)=> handleInputChange(event)} 
                            type="password" 
                            name= "password"
                            required
                            className="form-control"
                            value={password}></input>
                        </div>

                        <button onClick={handleFormSubmit} className="btn">Submit</button>

                        <div className="form-group">
                            <div class="forgot_password">Forgot Password?</div>

                            <div className="signup_link">Not a member?
                                <Link to="/signup" className="signup"> Sing up</Link>
                            </div>.
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};


const mapStateToProps = ({user: {userError, userSuccess}}) => ({
    userError,
    userSuccess

});


export default connect(mapStateToProps, null)(Signup);