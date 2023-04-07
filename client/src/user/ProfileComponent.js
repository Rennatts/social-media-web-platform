import React, { useEffect, useState } from 'react';
import './css/ProfileComponent.css';
import { useDispatch, connect } from "react-redux";
import { isLogged, logout } from './auth';
import {TOGGLE_SUCCESS} from '../redux/types/userTypes';
import { getPostsByUser } from '../redux/actions/postActions';
import { Link, Redirect } from 'react-router-dom';


function ProfileComponent({ profile, userPosts, userSuccess, userError }) {
    const jwt = isLogged();
    const dispatch = useDispatch();

    const[ error, setError ] = useState("");

    const userId = jwt.user._id;
    const token= jwt.token;



    useEffect(() => {
        if(userSuccess) {
            dispatch({ type: TOGGLE_SUCCESS});
            logout(() => {
                return <Redirect to="/" ></Redirect>
            });
        }
        if(userError) {
            setError(userError);
        }
        function loadUserPosts(){
            dispatch(getPostsByUser(token, userId));
        }
        loadUserPosts();
    }, [dispatch]);


    return (
        <div className="post-by2">
            <Link to={`/user/${profile._id}`}>
            <img 
                className= "img-fluid"
                src={profile.url}
                alt= {profile.name}
            ></img>
            <p className="profilename">{profile.name}</p>
            <h7>posts: {userPosts.length}</h7>
            <h7>Followers: {profile.followers.length}</h7>
            </Link>
        </div>
    )
};


const mapStateToProps = ( { 
    user: {userSuccess, userError}, 
    post: {userPosts},
}) => ({
    userSuccess,
    userError,
    userPosts
});

export default connect(mapStateToProps, null)(ProfileComponent);
