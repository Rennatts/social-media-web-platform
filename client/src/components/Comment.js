import React from 'react';
import { useDispatch } from 'react-redux';
import { isLogged } from './../auth';
import { deleteComment } from '../redux/actions/postActions';
import './css/Comment.css';

function Comment({ comment, postId}) {
    const jwt = isLogged();
    const dispatch = useDispatch();
    const date = new Date(comment.created);

    const postedBy = comment.postedBy._id;

    const userId = jwt.user._id;

    
    console.log(comment);

    function confirDeleteComment(){ 
        let answer = window.confirm("Are you sure you want to delete the comment?")
        if(answer) {
            dispatch(deleteComment(jwt.token, userId, postId, comment));
        }
        
    };

    console.log(comment);



    return (
        <div className="main_comments_container">
            <div className="comments_header">
                <div className="comment_basicinfo">
                    <img 
                        className= "img_profile_comment"
                        src={comment.postedBy.url} 
                        alt= {comment.postedBy.name}
                    ></img>
                    
                    <h5 className="name_comment">
                        {comment.postedBy.name}
                    </h5>

                    <div className="card_text_comment">
                       {comment.text}
                    </div>
                </div>

                {comment.postedBy._id === jwt.user._id && 
                    <div className="col-12">
                        <i onClick={confirDeleteComment}
                        className="fa fa-trash bts btn-danger ml-auto"></i>
                    </div>
                }

                <p className="date_comment">
                    {date.toLocaleDateString()}
                </p>
   
            </div>

        </div>
    )
};




export default Comment;