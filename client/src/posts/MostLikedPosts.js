import React, {useEffect} from 'react';
import RankingComponent from './../components/RankingComponent';
import {getMostLikedPosts} from './../redux/actions/postActions';
import { useDispatch, connect } from 'react-redux'; 
import { isLogged } from './../auth/index';
import RankingPost from './../components/RankingPost';


function MostLikedPosts({onChange, dataFromSearch, posts}) {

    const dispatch = useDispatch();
    const jwt = isLogged();

    useEffect(()=> {
        function getMostLiked(){
            dispatch(getMostLikedPosts(jwt.token));
        }

        getMostLiked();
    },[dispatch]);

    console.log(posts);

    return (
        <div>
            <div className="most_liked_header">
               <h1>Most liked posts</h1>
            </div>
            {/* <RankingComponent onChange={onChange} dataFromSearch={dataFromSearch}></RankingComponent> */}

            <div className="post_container_ranking">
                {posts.map((item, i) => {
                    return <RankingPost post={item} key={item._id}></RankingPost>
                })}
            </div>

        </div>
    )
}

const mapStateToProps = ({ post: {posts} }) => ({
    posts
})




export default connect(mapStateToProps, null)(MostLikedPosts);
