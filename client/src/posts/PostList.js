import React, {useEffect, useState} from 'react';
import { isLogged } from './../auth/index';
import Post from './../components/Post';
import SearchIcon from "@material-ui/icons/Search";

function PostList({posts}) {

    const jwt = isLogged();
    const[data, setData] = useState([]);
    let [dataFromSearch, setDataFromSearch] = useState("");

    useEffect(() => {
        setData(posts);
    }, [posts])

    const filteredData = posts.filter(post => {
        return post.brand.toLowerCase() && post.productname.toLowerCase() && post.body.toLowerCase().includes(dataFromSearch.toLowerCase());
    });

    const onChange = (e) => {
        setDataFromSearch(e.target.value)
    
    }

    return (
        <div>
            <form className="search-topic-wrapper">
                <SearchIcon className="header__searchIcon"></SearchIcon> 
                <input
                className="search_input"
                    placeholder="Search..."
                    value={dataFromSearch}
                    onChange={onChange}
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