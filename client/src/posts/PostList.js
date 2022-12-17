import React, {useEffect, useState} from 'react';
import { isLogged } from './../auth/index';
import Post from './Post';
import SearchIcon from "@material-ui/icons/Search";
import './css/PostList.css';

function PostList({posts}) {

    const jwt = isLogged();
    const[data, setData] = useState([]);
    let [dataFromSearch, setDataFromSearch] = useState("");

    useEffect(() => {
        setData(posts);
    }, [posts])

    const filteredData = posts.filter(post => {
        return post.body.toLowerCase().includes(dataFromSearch.toLowerCase());
    });

    const onChange = (e) => {
        setDataFromSearch(e.target.value)
    
    }

    return (
        <div>
            <form className="search_posts">
                <SearchIcon className="search_icon_posts"></SearchIcon> 
                <input className="search_input_posts"
                    placeholder="Search..."
                    value={dataFromSearch}
                    onChange={onChange}
                    type="search"
                />
            </form>
            
            <div>
                {filteredData.map((item, i)=> {
                    return <Post post={item} key={item._id}></Post>
                })}
            </div>   
        </div>
    )
};



export default PostList;