import React, {useState, useEffect } from 'react'
import { isLogged } from './../auth/index';
import { useDispatch } from 'react-redux';
import {likeposttwo, unlikeposttwo, deletePost, addComment, getPost } from '../redux/actions/postActions';
import {addComments } from './../user/apiUser';
import CommentsList from '../components/CommentsList';
import Moment from "react-moment";
import './css/Post.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import ImageSlider from '../components/ImageSlider';
import DefaultProfile from './../images/avatar.png';
import {useHistory} from 'react-router-dom';
import { useSelector } from 'react-redux';




function Post({ post }) {
    const [likes, setLikes] = useState([]);
    const [like, setLike] = useState(false);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const history = useHistory();

    const date = new Date(post && post.created);
    const jwt = isLogged();
    const dispatch =  useDispatch();

    const postId = post && post._id;
    const token = jwt.token;
    const userId = jwt.user._id;


    
    useEffect(() => {

        setLikes(post && post.likes);
        
        if(post && post.comments){
            setComments(post && post.comments);
            // checkComment();
        }

        checkLike(post && post.likes);
    }, [post && post.likes, post && post.comments]);  
    




    function checkLike(likes) {
        const userId = jwt.user._id;
        let match = likes.indexOf(userId) !== -1;
        setLike(match);

    };


    const handleLike = () => {
        if (!like) {
            setLike(true);
            setLikes([...likes, userId]);
            dispatch(likeposttwo(userId, token, postId));
        }
    };
    
    const handleUnlike = () => {
        if (like) {
            setLike(false);
            setLikes(likes.filter(id => id !== userId));
            dispatch(unlikeposttwo(userId, token, postId));
        }
    };

    function confirmDeletePost(){ 
        let answer = window.confirm("Are you sure you want to delete post?")
        if(answer) {
            dispatch(deletePost(jwt.token, post._id));
        }
    }


    const handleAddComment = async () => {
        const newComment = await dispatch(addComment(jwt.token, userId, postId, comment));
        if (newComment) {
            setComments(newComment);
            setComment("");
        }
    };
    


    const handleCommentDelete = (deletedComment) => {
        setComments(comments.filter((item) => item._id !== deletedComment._id));
    };



    return (
        <div className="post_box">
            <div className='user_profile_box'>
                <div className='photo_name_box'>
                    {
                    comment.postedBy?.url ? 
                    (<img
                        className="img_profile_comment"
                        src={comment.postedBy?.url}
                        alt={comment.postedBy?.name}
                    ></img>) : 
                    (<img
                        className="img_profile_comment"
                        src={DefaultProfile}
                        alt="DefaultProfile"
                    ></img>)
                    }
                    <h2>{post && post.postedBy.name}</h2>
                </div>
                <div className='date_box'>
                    <Moment className="date" format="HH:mm YYYY-MM-DD">{post && post.created}</Moment>
                </div>
            </div>

            
            <div className="body_box">
                <p>{post && post.body}</p>
            </div>

            <ImageSlider image={post && post.url}></ImageSlider>

            <div className="bottom_box">    
                <div className="comments_box">
                    <FontAwesomeIcon className="comment_icon" icon={faComment} size = '1x'></FontAwesomeIcon>
                    <div className="comments_link"><h5 className="mr-2">{post && post.comments.length}</h5></div>
                </div>

                <div className="likes_box">
                    {
                        like ? ( 
                        <h5 className="mr-2">
                        <span className="badge">
                            {" "}
                            {likes? likes.length: 0}{" "}
                        </span>
                        <FontAwesomeIcon icon={faHeart} size = '1x' onClick={handleUnlike} 
                        className="fa-heart">
                        </FontAwesomeIcon>
                        </h5>
                    ) : (
                        <h5 className="mr-2">
                        <span className="badge">
                            {" "}
                            {likes? likes.length: 0}{" "}
                        </span>
                        <FontAwesomeIcon icon={faHeart} size = '1x' onClick={handleLike}
                        className="fa-heart" >
                        </FontAwesomeIcon>
                        </h5>
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
            <div className="comments_box">
                <FontAwesomeIcon icon={faComment}></FontAwesomeIcon>
                <input value={comment} onChange={(event)=> setComment(event.target.value)} className='leave_comment'></input>
                <button onClick={handleAddComment}>Send</button>
            </div>
            <CommentsList handleCommentDelete={handleCommentDelete} postId={post._id} comments={comments}></CommentsList>
        </div>
    )

};


export default Post;