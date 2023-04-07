import React, {useState, useEffect} from 'react'
import { isLogged } from './auth';
import { useDispatch } from 'react-redux';
import {likeposttwo, unlikeposttwo} from './../redux/actions/postActions';

function PostUser({post}) {
    const [likes, setLikes] = useState([]);
    const [like, setLike] = useState(false);
    const [comments, setComments] = useState([]);
    const [posted, setPosted] = useState([]);
    const date = new Date(post.created);
    const jwt = isLogged();

    const dispatch =  useDispatch();


    useEffect(() => {
        setLikes(post && post.likes);
        setComments(post && post.comments);
        checkLike(post && post.likes);
    }, [post.likes, post.comments]);


    const postId = post._id;
    const token = jwt.token;
    const userId = jwt.user._id;


    function checkLike(likes) {
        const userId = jwt.user._id;
        let match = likes.indexOf(userId) !== -1;
        setLike(match);

    };


    return (
        <div style={{height: "400px", width: "728px"}} className="card mb-2 border border-primary">
            <div className="card-header bg-light">
                <div className="d-flex flex-row justify-content-start">
                    <div className="post-by">
                        <p className="text-dark font-weight-bold">
                            {post.brand}
                        </p>
                        <p className="text-dark font-weight-bold">
                            {post.productName}
                        </p>
                        <img>{post.photo}</img>
                        <h7 className="text-dark font-weight">
                          {post.postedBy.name || jwt.user.name}
                        </h7>
                        <hr></hr>
                        <h10 className="text font-weight-bold">
                            {post.created}
                        </h10>
                    </div>
                </div>
            </div> 
            <div>
                <img style={{height: "400px", width: "728px"}} src={post.url} alt={post.productname}></img>
            </div>
            <div className="card-body">
                {post.body}
            </div>   
            <div className="card-footer">
                <div className="d-flex flex-row justify-content-center align-items-center">
                    <div className="card-footer">
                    <div className="d-flex flex-row justify-content-center align-items-center">
                        {
                            like ? ( 
                            <div className="mr-2">
                                <span className="badge badge-danger p-2 mr-2">
                                    {" "}
                                    {likes? likes.length: 0}{" "}
                                </span>
                                <i onClick={()=> dispatch(unlikeposttwo(userId, token, postId))}
                                className="fa fa-heart text-danger mr-2">
                                </i>
                            </div>
                        ) : (
                            <div className="mr-2">
                                <span className="badge badge-danger p-2 mr-2">
                                    {" "}
                                    {likes? likes.length: 0}{" "}
                                </span>
                                <i onClick={()=> dispatch(likeposttwo(userId, token, postId))}
                                className="fa fa-heart text-danger mr-2">
                                </i>
                            </div>

                        )
                        }

                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default PostUser;