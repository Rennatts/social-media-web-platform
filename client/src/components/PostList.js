import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux'; 
import { isLogged } from './../auth/index';
import Post from './../posts/Post';

function PostList({posts, socket}) {

    const dispatch = useDispatch();
    const jwt = isLogged();
    const[data, setData] = useState([]);


    useEffect(() => {
        setData(posts);
    }, [posts])


    return (
        <div>
            <div>
                {data.map((item, i)=> {
                    return <Post post={item} key={item._id}></Post>
                })}
            </div>   
        </div>
    )
};



export default PostList;