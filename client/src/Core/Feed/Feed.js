import React, {useEffect} from 'react';
import { useDispatch, connect } from 'react-redux'; 
import { isLogged } from './../../auth';
import { getFollowingPosts } from '../../redux/actions/postActions';
import Post from './../../posts/Post';


function Feed({ feedPosts }) {
    const dispatch = useDispatch();
    const jwt = isLogged();

    const token = jwt.token;
    const userId = jwt.user._id;

    console.log("feedPosts", feedPosts)

    useEffect(() => {
        if(jwt) {
            function loadFollowingPosts() {
                dispatch(getFollowingPosts(token, userId));
            }
            loadFollowingPosts()
        } 
    }, [dispatch]);
 
    return (
        <div className="post_container">
            <div className="most_liked_header">
               <h1>Following posts</h1>
            </div>
            <div>
                {feedPosts.map((item, i) => {
                    return <Post post={item} key={item._id}></Post>
                })}
            </div>
        </div>
    )

};


const mapStateToProps = ({ post: {feedPosts} }) => ({
    feedPosts
})


export default connect(mapStateToProps, null)(Feed);