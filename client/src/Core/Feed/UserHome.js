import React, { useContext, useState, useEffect, useRef } from 'react';
import { useDispatch, connect } from 'react-redux'; 
import { isLogged } from './../../auth';
import { getFollowingPosts } from '../../redux/actions/postActions';
import PostList from './../PostList';


function UserHome({ feedPosts }) {
    const dispatch = useDispatch();
    const jwt = isLogged();

    const token = jwt.token;
    const userId = jwt.user._id;

    const[data, setData]= useState();

    useEffect(() => {
        if(jwt) {
            function loadFollowingPosts() {
                dispatch(getFollowingPosts(token, userId));
            }
            loadFollowingPosts()
        } 
    }, [dispatch]);

    console.log(feedPosts);
 
    return (
        <div className="jubotron">


            <div className="post_container">
               <PostList posts={feedPosts}></PostList>
            </div>
        
        </div>
    )

};


const mapStateToProps = ({ post: {feedPosts} }) => ({
    feedPosts
})


export default connect(mapStateToProps, null)(UserHome);