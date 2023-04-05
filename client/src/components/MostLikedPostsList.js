import React from 'react';
import MostLikedPostsListFinal from './MostLikedPostsListFinal';
import Post from './../posts/Post';

const PostList = ({
    posts,
  }) =>
    posts !== null &&
    posts.length > 0 &&
    posts.map((post) => (
      <Post
        post={post}
      />
    ));
  
  export default PostList;