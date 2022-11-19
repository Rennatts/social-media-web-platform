import React, {useState, useEffect } from 'react'
import { isLogged } from './../auth';
import { useDispatch } from 'react-redux';
import {likeposttwo, unlikeposttwo, deletePost} from './../redux/actions/postActions';
import CommentsList from './CommentsList';
import Moment from "react-moment";
import { Link } from 'react-router-dom';
import './css/Post.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import ImageSlider from './../components/ImageSlider';
import DefaultProfile from '../images/avatar.jpg';
import {useHistory} from 'react-router-dom';



function Post({ post }) {
    const [likes, setLikes] = useState([]);
    const [like, setLike] = useState(false);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState(false);
    const[currentImage, setCurrentImage] = useState(0);
    const [length, setLength] = useState();

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
            checkComment();
        }

        checkLike(post && post.likes);
    }, [post && post.likes, post && post.comments]);  



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


    return (
        <div className="post_box">
            <div className="user_profile_box">
                <img 
                src={post && post.postedBy.url} 
                alt={post && post.postedBy.name}
                onError ={i => (i => i.target.src = `${DefaultProfile}`)}
                ></img>
                <h5>{post && post.postedBy.name}</h5>
                <h8>Followers {post && post.postedBy.followers.length}</h8>
            </div>

            <div className="post_box_info">
                <div className="date_box">
                   <Moment className="date" format="HH:mm YYYY-MM-DD">{post && post.created}</Moment>
                </div>
            </div>

            <ImageSlider image={post && post.url}></ImageSlider>

            <div cassName="img_container">
                <div className="body_box">
                    <p><h10 className="username">{post && post.postedBy.name} </h10>{post && post.body}</p>
                </div>
            </div> 

            <div className="bottom_box">    
                <div className="comments_box">
                  <FontAwesomeIcon onClick={()=> history.push("/comments")} className="comment_icon" icon={faComment} size = '2x'></FontAwesomeIcon>
                  <Link className="comments_link"><h5 className="mr-2">{post && post.comments.length}</h5></Link>
                </div>

                <div className="likes_box">
                    {
                        like ? ( 
                        <h5 className="mr-2">
                        <span className="badge">
                            {" "}
                            {likes? likes.length: 0}{" "}
                        </span>
                        <FontAwesomeIcon icon={faHeart} size = '2x' onClick={()=> dispatch(unlikeposttwo(userId, token, postId))}
                        className="fa-heart">
                        </FontAwesomeIcon>
                        </h5>
                    ) : (
                        <h5 className="mr-2">
                        <span className="badge">
                            {" "}
                            {likes? likes.length: 0}{" "}
                        </span>
                        <FontAwesomeIcon icon={faHeart} size = '2x' onClick={()=> dispatch(likeposttwo(userId, token, postId))}
                        className="fa-heart" >
                        </FontAwesomeIcon>
                        </h5>
                    )
                    }   
                </div>
                {post.postedBy._id === jwt.user._id && 
                <div className="post_edit">
                    <FontAwesomeIcon icon={faTrash} className="trash_icon_post" onClick={confirDeletePost}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faEdit} className="edit_icon_post"></FontAwesomeIcon>
                </div>
                }
            </div>
            <CommentsList postId={post._id} comments={comments && comments}></CommentsList>
        </div>
    )

};


export default Post;