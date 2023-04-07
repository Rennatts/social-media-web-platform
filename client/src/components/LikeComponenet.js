import React, { useEffect, useState } from 'react';
import { removeLikeToBranduser, addLikeToBranduser } from '../redux/actions/branduserActions';
import { useParams, Link, Redirect, useHistory  } from 'react-router-dom';
import { isLogged } from './auth';
import { useDispatch, connect } from "react-redux";

function LikeComponenet({ likes }) {
    const { branduserId } = useParams();
    const jwt = isLogged();
    const dispatch = useDispatch();
    const[existinglike, setExistinglike] =  useState(false);
    const userId = jwt.user._id;

    console.log(likes);

    useEffect(()=> {

    },[]);

    return (
        <div>
            {
                existinglike ? ( 
                    <div className="mr-2">
                        <span className="badge badge-danger p-2 mr-2">
                            {" "}
                            {existinglike? likes.length: 0}{" "}
                        </span>
                        <i onClick={()=> dispatch(removeLikeToBranduser(userId, branduserId))}
                        className="fa fa-heart text-danger mr-2">
                        </i>
                    </div>
                ) : (
                    <div className="mr-2">
                        <span className="badge p-2 mr-2">
                            {" "}
                            {existinglike? likes.length: 0}{" "}
                        </span>
                        <i onClick={()=> dispatch(addLikeToBranduser(userId, branduserId))}
                        className="fa fa-heart text-danger mr-2">
                        </i>
                    </div>
                )
            }
            
        </div>
    )
}

export default LikeComponenet;
