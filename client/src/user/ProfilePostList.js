import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux'; 
import { isLogged } from './../auth';
import ProfilePosts from './ProfilePosts';

function ProfilePostList({posts}) {

    const dispatch = useDispatch();
    const jwt = isLogged();
    const[data, setData] = useState([]);


    useEffect(() => {
        setData(posts);
    }, [posts])


    return (
        <div className="profile_posts_list">
            {data.map((item, i)=> {
                return <ProfilePosts post={item} key={item._id}></ProfilePosts>
            })}
        </div>   

    )
};



export default ProfilePostList;