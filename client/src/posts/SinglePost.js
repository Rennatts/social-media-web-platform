import React, { useEffect, useState } from 'react';
import { useDispatch, connect } from 'react-redux'; 
import { isLogged } from './../auth/index';
import { getPost, deletePost, unlikeposttwo, likeposttwo } from '../redux/actions/postActions';
import Moment from "react-moment";
import ImageSlider from '../components/ImageSlider/ImageSlider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import DefaultProfile from '../images/avatar.jpg';
import {useHistory, Link} from 'react-router-dom';
import './css/SinglePost.css';


function SinglePost({ post, match}) {

    const jwt = isLogged();
    const dispatch = useDispatch();

    const postId = match.params.postId;
    const token = jwt.token;
    const userId = jwt.user._id;

    const [likes, setLikes] = useState([]);
    const [like, setLike] = useState(false);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState(false);

    const history = useHistory();
    
    console.log("postd", postId);


    useEffect(() => {
        dispatch(getPost(jwt.token, postId));

        
    }, [dispatch, getPost]);

    console.log(post);


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

    function confirDeletepost(){ 
        let answer = window.confirm("Are you sure you want to delete post?")
        if(answer) {
            dispatch(deletePost(jwt.token, post._id));
        }
        
    }

    console.log(post);


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
        <div className="singlepost">
            <div className="user_profile_box">
                <img 
                src={post.postedBy.url} 
                alt={post && post.postedBy.name}
                onError ={i => (i => i.target.src = `${DefaultProfile}`)}
                ></img>
                <h5>{post && post.postedBy.name}</h5>
                <h8>Followers {post && post.postedBy.followers.length}</h8>
            </div>

            <div className="post_box_info">
                    <div className="product_brand">
                        <h5>Category: {post && post.category}</h5>
                    </div>

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
                    <FontAwesomeIcon icon={faTrash} className="trash_icon_post" onClick={confirDeletepost}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faEdit} className="edit_icon_post"></FontAwesomeIcon>
                </div>
                }
            </div>
        </div>
        
    )
}


const mapStateToProps = ({ post: { post } }) => ({
    post
})



export default connect(mapStateToProps, null)(SinglePost);