import React, { useState, useEffect } from 'react'
import { isLogged } from './../auth/index';
import { useDispatch } from 'react-redux';
import {likeposttwo, unlikeposttwo, deletePost } from './../redux/actions/postActions';
import Moment from "react-moment";
import './css/ProfilePosts.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import ImageSliderProfile from '../components/ImageSlider/ImageSliderProfile';
import DefaultProfile from './../../src/images/avatar.png';
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";



function ProfilePosts({ post }) {
    const [likes, setLikes] = useState([]);
    const [like, setLike] = useState(false);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState(false);

    const jwt = isLogged();
    const dispatch =  useDispatch();

    const postId = post._id;
    const token = jwt.token;
    const userId = jwt.user._id;

    
    useEffect(() => {
        setLikes(post.likes);
        if(post.comments){
            setComments(post.comments);
            checkComment();
        }

        checkLike(post.likes);
    }, [post.likes, post.comments]);  


    function checkLike(likes) {
        const userId = jwt.user._id;
        let match = likes.indexOf(userId) !== -1;
        setLike(match);

    };


    function checkComment(comments) {
        if(comments > 0){
            setComment(true);
        }
    };

    function confirmDeletePost(){ 
        let answer = window.confirm("Are you sure you want to delete post?")
        if(answer) {
            dispatch(deletePost(jwt.token, post._id));
        }
    }


    return (
        <div className="post_box_profile">
            <div className="user_profile_box_profile">
                <img
                    className='img_thumbnail'
                    src={post.postedBy.url}  
                    alt= {post.postedBy.name}
                    onError= {i => (i.target.src= `${DefaultProfile}`)}
                ></img> 
                <p>{post.postedBy.name}</p>
                <p>Followers {post.postedBy.followers.length === 0 ? 0 : post.postedBy.followers.length}</p>
            </div>

            <div className="post_box_info_profile">
                <div className="date_box_profile">
                    <Moment className="date" format="HH:mm YYYY-MM-DD">{post.created}</Moment>
                </div>
                <p>{post.body}</p>
            </div>

            <div className='image_slider_box'>
                <ImageSliderProfile image={post.url}></ImageSliderProfile>
            </div>

            <div className="bottom_box">  
                <div className="comments_box_profile">
                    <FontAwesomeIcon className="comment_icon_profile" icon={faComment} size = '1x'></FontAwesomeIcon>
                    <p className="mr-2_profile">{post.comments.length}</p>
                </div>

                <div className="likes_box_profile">
                    {
                        like ? ( 
                        <div className="mr-2_profile">
                            <span className="badge_profile">
                                {" "}
                                {likes? likes.length: 0}{" "}
                            </span>
                            <FontAwesomeIcon icon={faHeart} size = '1x' onClick={()=> dispatch(unlikeposttwo(userId, token, postId))}
                            className="fa-heart_profile">
                            </FontAwesomeIcon>
                        </div>
                    ) : (
                        <div className="mr-2_profile">
                            <span className="badge_profile">
                                {" "}
                                {likes? likes.length: 0}{" "}
                            </span>
                            <FontAwesomeIcon icon={faHeart} size = '1x' onClick={()=> dispatch(likeposttwo(userId, token, postId))}
                            className="fa-heart_profile" >
                            </FontAwesomeIcon>
                        </div>
                    )
                    }   
                </div>
                {post.postedBy._id === jwt.user._id && 
                    <div className="post_edit">
                        <FontAwesomeIcon icon={faTrash} className="trash_icon_post" onClick={confirmDeletePost}></FontAwesomeIcon>
                        <FontAwesomeIcon icon={faEdit} className="edit_icon_post"></FontAwesomeIcon>
                    </div>
                }
            </div>

        </div>
    )

};


export default ProfilePosts;