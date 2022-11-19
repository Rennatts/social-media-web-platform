import React, {useState, useEffect} from 'react'
import { isLogged } from './auth';
import { useDispatch } from 'react-redux';
//import {likeposttwo, unlikepost} from '../user/apiUser';
import {likeposttwo, unlikeposttwo, deletePost} from '../redux/actions/postActions';
import CommentsList from './components/CommentsList';
import { useSelector } from 'react-redux';




function SinglePost({ post }) {
    const [likes, setLikes] = useState([]);
    const [like, setLike] = useState(false);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState(false);

    const [photo, setPhoto] = useState([])

    const jwt = isLogged();
    const dispatch =  useDispatch();

    //const postedBy = useSelector();


    useEffect(() => {
        setLikes(post && post.likes);
        if(post && post.comments){
            setComments(post && post.comments);
            checkComment();
        }

        if(post && post.photo){
            setPhoto(post && post.photo);
        }

        checkLike(post && post.likes);

        console.log(post && post);
        
    }, [post && post.likes, post && post.comments]);   

    console.log(post);


    const postId = post && post._id;
    const token = jwt.token;
    const userId = jwt.user._id;



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

    console.log(post);

    return (
        <div className="card mb-2 border border-primary">
            <div className="card-header bg-light">
                <div className="d-flex flex-row justify-content-start">
                    <div className="post-by">
                        <img 
                        style={{height: "50px", width: "50"}} 
                        className= "img-fluid rounded pr-2 mr-1"
                        src={`http:localhost:5050/users/user/photo/${jwt.user._id}?${new Date().getTime()}`} 
                        alt= { post && post.postedBy.name }
                        ></img>

                        <h5 className="text-dark font-weight-bold">
                            {post && post.brand}
                        </h5>
                        <h5 className="text-dark font-weight-bold">
                            {post && post.productName}
                        </h5>
                        <h7 className="text-dark font-weight">
                          {post && post.postedBy.name || jwt.user.name}
                        </h7>
                        <hr></hr>
                        <h10 className="text font-weight-bold">
                            {post && post.created}
                        </h10>
                    </div>
                </div>
            </div> 
            <div>
            <img style={{height: "400px", width: "728px"}} src={post.url}  alt={post.photo}></img>
            </div>
            <div className="card-body">
                {post && post.body}
            </div>   
            <div className="card-footer">
                <div className="d-flex flex-row justify-content-center align-items-center">
                    <div className="card-footer">
                        <div className="d-flex flex-row justify-content-center align-items-center">
                            {
                                post && post.like ? ( 
                                <h5 className="mr-2">
                                <span className="badge badge-danger p-2 mr-2">
                                    {" "}
                                    {post && post.likes? likes.length: 0}{" "}
                                </span>
                                <i onClick={()=> dispatch(unlikeposttwo(userId, token, postId))}
                                className="fa fa-heart text-danger mr-2">
                                </i>
                                </h5>
                            ) : (
                                <h5 className="mr-2">
                                <span className="badge p-2 mr-2">
                                    {" "}
                                    {post && post.likes? post.likes.length: 0}{" "}
                                </span>
                                <i onClick={()=> dispatch(likeposttwo(userId, token, postId))}
                                className="fa fa-heart text-danger mr-2">
                                </i>
                                </h5>
                            )
                            }

                            <h5 className="mr-2">
                                <span className="badge badge-primary p-2 mr-2">
                                    {" "}
                                    {post && post.comments ? comments.length: 0}{" "}
                                </span>
                            </h5>
                            <i className="fa fa-comment text-primary"></i>
                        </div>
                    </div>
                    {post && post.postedBy._id === userId && 
                    <div className="float-right">
                        <i onClick={confirDeletePost}
                        className="fa fa-trash bts btn"></i>
                    </div>}
                </div>
            </div>
            <CommentsList postId={post && post._id} comments={comments && comments}></CommentsList>
        </div>
    )

};


export default SinglePost;