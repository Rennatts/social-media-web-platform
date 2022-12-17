import React, {useState, useEffect } from 'react'
import { isLogged } from './../auth';
import { useDispatch } from 'react-redux';
import {likeposttwo, unlikeposttwo } from './../redux/actions/postActions';
import Moment from "react-moment";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import ImageSlider from './ImageSlider/ImageSlider';
//import DefaultProfile from './../images/avatar';
import {useHistory} from 'react-router-dom';
import './css/RankingPost.css';


function RankingPost({ post }) {
    const [likes, setLikes] = useState([]);
    const [like, setLike] = useState(false);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState(false);
    const [fullproduct, setFullproduct]= useState();
    const [currentImage, setCurrentImage] = useState(0);
    const [length, setLength] = useState();

    const history = useHistory();

    console.log(post);

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


    return (
        <div className="post_box_ranking">
            <div className="user_profile_box_ranking">
                {/* <img 
                src={post && post.postedBy.url} 
                alt={post && post.postedBy.name}
                onError ={i => (i => i.target.src = `${DefaultProfile}`)}
                ></img> */}
                <h5>{post && post.postedBy.name}</h5>
                <h8>Followers {post && post.postedBy.followers.length}</h8>

                <div className="post_box_info_ranking">
                    <div className="date_box_ranking">
                        <Moment className="date" format="HH:mm YYYY-MM-DD">{post && post.created}</Moment>
                    </div>
                </div>

            </div>

            <ImageSlider image={post && post.url}></ImageSlider>

            <div className="product_brand_ranking">
                <h5>Procuct: {post && post.productname}</h5>
                <h5>Brand: {post && post.brand}</h5>
                <h5>Category: {post && post.category}</h5>
            </div>

            <div cassName="img_container_ranking">
                <div className="body_box_ranking">
                    <p><h10 className="username_ranking">{post && post.postedBy.name} </h10>{post && post.body}</p>
                </div>
            </div> 

            <div className="bottom_box_ranking">    
                <div className="comments_box_ranking">
                  <FontAwesomeIcon onClick={()=> history.push("/comments")} className="comment_icon_ranking" icon={faComment}></FontAwesomeIcon>
                  <Link className="comments_link_ranking"><h5 className="comments_count_ranking">{post && post.comments.length}</h5></Link>
                </div>

                <div className="likes_box_ranking">
                    {
                        like ? ( 
                        <h5 className="mr-2_ranking">
                        <span className="badge_ranking">
                            {" "}
                            {likes? likes.length: 0}{" "}
                        </span>
                        <FontAwesomeIcon icon={faHeart} onClick={()=> dispatch(unlikeposttwo(userId, token, postId))}
                        className="fa-heart_ranking">
                        </FontAwesomeIcon>
                        </h5>
                    ) : (
                        <h5 className="mr-2_ranking">
                        <span className="badge_ranking">
                            {" "}
                            {likes? likes.length: 0}{" "}
                        </span>
                        <FontAwesomeIcon icon={faHeart} onClick={()=> dispatch(likeposttwo(userId, token, postId))}
                        className="fa-heart_ranking">
                        </FontAwesomeIcon>
                        </h5>
                    )
                    }   
                </div>
            </div>
        </div>
    )

};


export default RankingPost;