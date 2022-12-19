import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {isLogged} from './../auth';
import Comment from './Comment';
import './css/CommentsList.css';



function CommentsList({ postId, comments }) {
    const jwt = isLogged();
    const dispatch = useDispatch();
    const[noOfElement, setNoOfElement] = useState(2);

    const loadMore = () => {
        setNoOfElement(noOfElement + 2)
    }

    const close = () => {
        setNoOfElement(noOfElement - noOfElement);
    }

    console.log(noOfElement);

    const userId = jwt.user._id;

    const slice = comments.slice(0, noOfElement);
 
    return (
        <div classList="comments_list">
            <div className="comments">
                {
                    slice.map((item, index) => (
                        <Comment comment={item} key={index} postId={postId}></Comment>
                    ))
                }
            </div>

            {comments.length > 2 ? 
            (<div className="comments_buttons">
                <button class="show_hide_comments" onClick={() => loadMore()}>Load More Comments</button>
                <button class="show_hide_comments" onClick={() => close()}>Close Comments</button>
            </div>) 
            : (null)
            }
        </div>
    );
};

export default CommentsList;
