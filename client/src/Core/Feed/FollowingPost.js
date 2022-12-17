import React, {useState, useEffect} from 'react'
import { isLogged } from './../../auth';
import { useDispatch } from 'react-redux';
//import {likeposttwo, unlikepost} from '../user/apiUser';
import {likeposttwo, unlikeposttwo, deletePost} from './../../redux/actions/postActions';
import CommentsList from './../../components/CommentsList';
import Moment from "react-moment";
import { Link } from 'react-router-dom';
import './../Post.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import {Slide} from 'react-slideshow-image';
import ImageSlider from './../../components/ImageSlider';
import DefaultProfile from './../../images/avatar';
import {useHistory} from 'react-router-dom';



function FollowingPost({ post }) {
    const [likes, setLikes] = useState([]);
    const [like, setLike] = useState(false);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState(false);

    const history = useHistory();

    const date = new Date(post && post.created);
    const jwt = isLogged();
    const dispatch =  useDispatch();

    const postId = post && post._id;
    const token = jwt.token;
    const userId = jwt.user._id;

    function showPosts(){
        for(let i=0; i< post.length; i++){
            <div className="post_box">
                <h1>{post.body}</h1>
            </div>
        }
    }

    

    return (
        {showPosts}
    )

};


export default FollowingPost;