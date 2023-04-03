import React, { useEffect, useState } from 'react';
import { useParams, Link, Redirect, useHistory  } from 'react-router-dom';
import { isLogged, checkAuth, logout } from '../auth/index';
import { getUser, deleteUser } from '../redux/actions/userActions';
import FollowButton from '../components/FollowButton';
import DefaultProfile from './../images/avatar.png';
import { useDispatch, connect } from "react-redux";
import {TOGGLE_SUCCESS} from '../redux/types/userTypes';
import { getPostsByUser } from '../redux/actions/postActions';
import './css/NewProfile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProfilePostList from './ProfilePostList';




function NewProfile({ userSuccess, userError, userPosts, match }) {
    const { userId } = useParams();
    const jwt = isLogged();
    const[ error, setError ] = useState("");
    const[ user, setUser ] = useState(null);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const date = user && user.created ? new Date(user.created): null;
    const history = useHistory();
    const [key, setKey]= useState();
    const [redirect, setRedirect] = useState(false);
    const [followButton, setFollowButton] = useState(false);
    const [followingButton, setFollowingButton] = useState(false);
    const[following, setFollowing] = useState(false);
    const[isfollowing, setIsfollowing]= useState();
    const[next, setNext]= useState(false);
    const [isFollowing, setIsFollowing] = useState(false);



    const urlId = (match.params.userId);

    const current = (jwt.user._id === urlId);
    
    useEffect(() => {
        async function getProfile() {
            const userData = await getUser(userId, jwt && jwt.token);
            if(userData.error){
                setError(userData.error);
            } else{
              setUser(userData.data);
              
            }
            
        }
        if(loading) {
            getProfile();
            setNext(true);
        }
        return()=> {
            setLoading(false);
        };
    }, [userId, jwt, loading]);


    useEffect(()=> {
        if(next){
            function checkFollow(user){
                let match = user.followers.find(follower => follower._id == jwt.user._id);
                setIsfollowing(match);
            }
            checkFollow(user);
            if(isfollowing){
                setFollowing(true)
            }
        }

    },[user]);
    

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
            dispatch(getPostsByUser(jwt.token, userId));
        }
        loadUserPosts();
    }, [userError, userSuccess, dispatch]);



    function showError() {
        return error && <div className="alert alert-danger">{error}</div>
    };


    // function handleButtonClick(event, user) {
    //     event.preventDefault();
    //     setUser(user);
    //     setFollowing(!following);
    // };

    function handleButtonClick(userData) {
        setUser(userData);
        setIsFollowing(!isFollowing);
    };
    
    

    

    console.log(user);


    function deleteConfirmed(){
        let answer = window.confirm("Are you sure you want to delete your account? ")
        if(answer) {
            dispatch(deleteUser(userId, jwt.token));
            setRedirect(true);
        }
    };



    return (
        <div className="profile_main_container">
            <div className="profile_box">
                <div className='image_box'>
                    <div className='profile_image'>
                        <img
                            className='img_thumbnail'
                            src={user && user.url}  
                            alt= {user && user.name}
                            onError= {i => (i.target.src= `${DefaultProfile}`)}
                        ></img>  
                    </div>
                    <h3 className='name'>{user && user.name}</h3>
                    <span className='created'>Subscribed {date && date.toLocaleDateString()}</span>
                </div>
                <div className="content">
                    <div className="stats">
                        <h3 className="number">{userPosts.length === 0 ? 0 : userPosts.length}</h3>
                        <h3 className="number-title">Posts</h3>
                    </div>
                    <div className="stats">
                        <h3 className="number">{user && user.followers.length === 0 ? 0 : user && user.followers.length}</h3>
                        <h3 className="number-title">Followers</h3>
                    </div>
                    <div className="stats">
                        <h3 className="number">{user && user.following.length === 0 ? 0 : user && user.following.length}</h3>
                        <h3 className="number-title">Following</h3>
                    </div>
                </div>
                <div className="follow_container">                          
                    { checkAuth(userId) ? 
                        (null) : 
                        (<FollowButton 
                            className="follow_button"
                            following={isFollowing}
                            handleButtonClick={handleButtonClick}
                            token={jwt && jwt.token}
                            followId={user && user._id}
                            userId={jwt && jwt.user._id}
                        ></FollowButton>)
                    }
                </div> 
            </div>

            <div className="profile_posts">
                <ProfilePostList posts={userPosts}></ProfilePostList>
            </div>
        </div>

    );  

};


const mapStateToProps = ( { 
    user: {userSuccess, userError}, 
    post: {userPosts},
}) => ({
    userSuccess,
    userError,
    userPosts
});





export default connect(mapStateToProps, null)(NewProfile);