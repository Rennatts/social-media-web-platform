import React, { useEffect, useState } from 'react';
import { useDispatch, connect } from 'react-redux'; 
import { isLogged } from './auth';
import { Link } from 'react-router-dom';
import { getPost, deletePost, unlikeposttwo, likeposttwo } from '../redux/actions/postActions';
import CommentList from './../components/CommentsList';
import Moment from "react-moment";
import ImageSlider from '../components/ImageSlider/ImageSlider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart, faForward, faBackward } from "@fortawesome/free-solid-svg-icons";
import DefaultProfile from '../images/avatar';
import './css/SinglePostList.css';



function SinglePostList({ post, match}) {
    let [data, setData] = useState();
    let [error, setError] = useState();


    const jwt = isLogged();
    const dispatch = useDispatch();

    const postId = match.params.postId;
    const token = jwt.token;
    const userId = jwt.user._id;

    console.log(postId);

    useEffect(() => {
        if(jwt) {
            function loadPosts() {
                dispatch(getPost(jwt.token, postId));
            }
            loadPosts();
            
        } 

    }, [dispatch]);   

    console.log(post);

    const [likes, setLikes] = useState([]);
    const [like, setLike] = useState(false);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState(false);


    useEffect(() => {
        setLikes(post && post.likes);
        if(post.comments){
            setComments(post && post.comments);
            checkComment();
        }

        checkLike(post && post.likes);
        
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
        
    };

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
    <div className="singlepostlist">
        <div className="post_box">
            <div className="user_profile_box">
                {/* <img 
                src={post && post.postedBy.url} 
                alt={post && post.postedBy.name}
                onError ={i => (i => i.target.src = `${DefaultProfile}`)}
                ></img> */}
                <p>{post && post.postedBy.name}</p>
                <p>Followers {post && post.postedBy.followers.length}</p>
            </div>

            <div className="post_box_info">
                <div className="product_brand">
                    <p>Procuct: {post && post.productname}</p>
                    <p>Brand: {post && post.brand}</p>
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
                  <FontAwesomeIcon className="comment_icon" icon={faComment} size = '2x'></FontAwesomeIcon>
                  <p className="comments_link"><p className="mr-2">{post && post.comments.length}</p></p>
                </div>

                <div className="likes_box">
                    {
                        like ? ( 
                        <div className="mr-2">
                            <span className="badge">
                                {" "}
                                {likes? likes.length: 0}{" "}
                            </span>
                            <FontAwesomeIcon icon={faHeart} size = '2x' onClick={()=> dispatch(unlikeposttwo(userId, token, postId))}
                            className="fa-heart">
                            </FontAwesomeIcon>
                        </div>
                    ) : (
                        <div className="mr-2">
                            <span className="badge">
                                {" "}
                                {likes? likes.length: 0}{" "}
                            </span>
                            <FontAwesomeIcon icon={faHeart} size = '2x' onClick={()=> dispatch(likeposttwo(userId, token, postId))}
                            className="fa-heart" >
                            </FontAwesomeIcon>
                        </div>
                    )
                    }   
                </div>
            </div>

        </div>

    </div>
        
    )
}


const mapStateToProps = ({ post: { post } }) => ({
    post
})


export default connect(mapStateToProps, null)(SinglePostList);