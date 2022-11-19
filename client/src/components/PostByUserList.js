import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux'; 
import { isLogged } from './auth';
import PostUser from '../Core/PostUser';


function PostByUserList({posts}) {

    const dispatch = useDispatch();
    const jwt = isLogged();
    const[data, setData] = useState([]);

    useEffect(() => {
        setData(posts);
    }, [posts])

    return (
        <div className="row my-5">
            <div className="col-md-8 mx-auto">
                {data && data.map((item, i)=> {
                    return <PostUser post={item} key={item._id}></PostUser>
                })}
            </div>   
        </div>
    )
};

export default PostByUserList;