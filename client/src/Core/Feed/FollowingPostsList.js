import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux'; 
import { isLogged } from './../..';
import FollowingPost from './FollowingPost';
import Post from './../Post';


function FollowingPostsList({ posts }) {
    const dispatch = useDispatch();
    const jwt = isLogged();
    const[data, setData] = useState([]);


    useEffect(() => {
        setData(posts);
    }, [posts])
    console.log(data);



    return (
        <div className="col-md-8 mx-auto">
            {data.keys(data).map(function(key, index) {
                return <Post post={key} key={index._id}></Post>
            })}
        </div>   

    )
};



export default FollowingPostsList;