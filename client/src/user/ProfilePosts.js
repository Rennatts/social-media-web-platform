import React, { useState, useEffect } from 'react'
import { isLogged } from './../auth/index';
import { useDispatch } from 'react-redux';
import {likeposttwo, unlikeposttwo, deletePost} from './../redux/actions/postActions';
import Moment from "react-moment";
import { Link } from 'react-router-dom';
import './css/ProfilePosts.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import ImageSliderProfile from '../components/ImageSlider/ImageSliderProfile';



function ProfilePosts({ post }) {
    const [likes, setLikes] = useState([]);
    const [like, setLike] = useState(false);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState(false);
    const [fullproduct, setFullproduct]= useState();
    const[currentImage, setCurrentImage] = useState(0);
    const [length, setLength] = useState();


    const date = new Date(post.created);
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

    function confirDeletePost(){ 
        let answer = window.confirm("Are you sure you want to delete post?")
        if(answer) {
            dispatch(deletePost(jwt.token, post._id));
        }
        
    }

    console.log(post);


    return (
        <div className="post_box_profile">
            <div className="user_profile_box_profile">
                <img src={post.postedBy.url} alt={post.postedBy.name}></img>
                <h5>{post.postedBy.name}</h5>
                <h8>Followers {post.postedBy.followers.length === 0 ? 0 : post.postedBy.followers.length}</h8>
            </div>

            <div className="post_box_info_profile">
                <div className="product_brand_profile">
                    <h5>Procuct: {post.productname}</h5>
                    <h5>Brand: {post.brand}</h5>
                    <h5>Category: {post.category}</h5>
                    <div className="date_box_profile">
                       <Moment className="date" format="HH:mm YYYY-MM-DD">{post.created}</Moment>
                    </div>
                </div>
            </div>

            <ImageSliderProfile image={post.url}></ImageSliderProfile>

            <div className="">  
                <Link className="comments_link_profile">
                    <div className="comments_box_profile">
                        <FontAwesomeIcon className="comment_icon_profile" icon={faComment} size = '2x'></FontAwesomeIcon>
                        <h5 className="mr-2_profile">{post.comments.length}</h5>
                    </div>
                </Link>  

                <div className="likes_box_profile">
                    {
                        like ? ( 
                        <h5 className="mr-2_profile">
                        <span className="badge_profile">
                            {" "}
                            {likes? likes.length: 0}{" "}
                        </span>
                        <FontAwesomeIcon icon={faHeart} size = '2x' onClick={()=> dispatch(unlikeposttwo(userId, token, postId))}
                        className="fa-heart_profile">
                        </FontAwesomeIcon>
                        </h5>
                    ) : (
                        <h5 className="mr-2_profile">
                        <span className="badge_profile">
                            {" "}
                            {likes? likes.length: 0}{" "}
                        </span>
                        <FontAwesomeIcon icon={faHeart} size = '2x' onClick={()=> dispatch(likeposttwo(userId, token, postId))}
                        className="fa-heart_profile" >
                        </FontAwesomeIcon>
                        </h5>
                    )
                    }   
                </div>
            </div>

        </div>
    )

};


export default ProfilePosts;