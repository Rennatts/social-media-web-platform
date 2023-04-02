import React, { useState, useEffect } from 'react';
import {Redirect} from 'react-router-dom';
import { useDispatch, connect } from 'react-redux';
import { signup } from './../redux/actions/userActions';
import { Link } from 'react-router-dom';
import './css/Signup.css';

import {
    TOGGLE_SUCCESS
} from '../redux/types/userTypes';

import LoginLogo from './../images/login.svg';




function Signup ({ userError, userSuccess }) {
    const[ user, setUser ] = useState({
        name: "",
        email: "",
        password: ""
    });

    const dispatch = useDispatch();

    const { name, email, password } = user;

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [redirect, setRedirect] = useState(false);


    useEffect(() => {
        if ( userError && userError !== null ) {
            setError(userError);
        }
        if(userSuccess) {
            setSuccess(userSuccess);
            setSuccessMessage('User successfully registered');

            dispatch({type: TOGGLE_SUCCESS})
            setTimeout(() => {
                setRedirect(true);
            }, 3000); 
        }
    }, [userError, userSuccess, dispatch]);



    function redirectUser(){
        return redirect && <Redirect to="/"></Redirect>

    };


    function handleInputChange(event) {
        setError("");
        setUser({...user, [event.target.name]: event.target.value});
    };

    function showError() {
        return error && <div className="alert alert-danger">{error}</div>
    };
    

    function handleFormSubmit(event){
        event.preventDefault();
        dispatch(signup(user));
    };




    return (
        <div className="signup_container">
            {showError()}


            {success && <div className='success_message'><p className=''>{successMessage}</p></div>}

            {redirectUser()}
            <div className='img_container'>
                <div className='go_back_btn'>
                    <Link to="/">
                        <button to="/" className=''>Go Back</button>
                    </Link>
                </div>
                <img src={LoginLogo} alt="login_logo"></img>
            </div>
            <div className='form_container'>
                <form className='form'> 
                    <div className="form-group">
                            <label className="text-muted">Name</label>
                            <input 
                            onChange={(event)=> handleInputChange(event)} 
                            type="name" 
                            name= "name"
                            required
                            className="form-control"
                            value={name}></input>
                    </div>
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
                </form>
            </div>
            
        </div>
        
    )
};


const mapStateToProps = ({user: {userError, userSuccess}}) => ({
    userError,
    userSuccess

});


export default connect(mapStateToProps, null)(Signup);