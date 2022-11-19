import React from 'react';
import MostLikedPostsListFinal from './MostLikedPostsListFinal';

const PostList = ({
    posts,
  }) =>
    posts !== null &&
    posts.length > 0 &&
    posts.map((post) => (
      <MostLikedPostsListFinal
        post={post}
        key={post._id}
      />
    ));
  
  export default PostList;