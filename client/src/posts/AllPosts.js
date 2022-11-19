import React, { useEffect } from 'react';
import { useDispatch, connect } from 'react-redux'; 
import { isLogged } from './../auth';
import { getAllPosts } from '../redux/actions/postActions';
import { Link } from 'react-router-dom';
import PostList from './PostList';
import './css/Post.css';


function AllPosts({ posts }) {
    const jwt = isLogged();
    const dispatch = useDispatch();


    useEffect(() => {
       if(jwt) {
           function loadPosts() {
               dispatch(getAllPosts(jwt.token, jwt.user._id));
           }
           loadPosts()
       } 
    }, [dispatch]);


    if(!jwt){
        return(
            <div className="container">
                <div className="row my-5">
                    <div className="col-md-8 mx-auto">
                        <div className="alert alert-info">
                            <Link to="/signin">Log In to have access to all the posts</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    };


    return (
        <div>
            <div className="post_container">
                <PostList posts ={posts}></PostList>  
            </div>
        </div>

    )
}



const mapStateToProps = ({ post: {posts} }) => ({
    posts
})

export default connect(mapStateToProps, null)(AllPosts);
