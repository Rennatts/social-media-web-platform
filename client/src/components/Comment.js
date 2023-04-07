import React from 'react';
import { useDispatch } from 'react-redux';
import { isLogged } from './../auth';
import { deleteComment } from '../redux/actions/postActions';
import DefaultProfile from './../images/avatar.png';
import './css/Comment.css';

function Comment({ comment, postId, onCommentDelete}) {
    const jwt = isLogged();
    const dispatch = useDispatch();
    const date = new Date(comment.created);


    async function confirmDeleteComment() {
        let answer = window.confirm("Are you sure you want to delete the comment?");
        if (answer) {
            await dispatch(deleteComment(jwt.token, jwt.user._id, postId, comment));
            onCommentDelete(comment);
        }
    }

    console.log("=====", comment)
    

    return (
        <div className="main_comments_container">
            <div className="comments_header">
                <div className="comment_basicinfo">
                    {
                    comment.postedBy.url !== "http://localhost:3000/files/undefined" ? 
                    (<img 
                        className= "img_profile_comment"
                        src={comment.postedBy.url} 
                        alt= {comment.postedBy.name}
                    ></img>) : 
                    (<img 
                        className= "img_profile_comment"
                        src={DefaultProfile} 
                        alt= "DefaultProfile"
                    ></img>)
                    }
                    
                    <p className="name_comment">
                        {comment.postedBy.name}
                    </p>

                    <div className="card_text_comment">
                       {comment.text}
                    </div>
                </div>

                {comment.postedBy._id === jwt.user._id && 
                    <div className="col-12">
                        <i onClick={confirmDeleteComment}
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