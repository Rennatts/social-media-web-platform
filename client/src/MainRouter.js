import React from 'react';
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom';
import Home from './Core/Home';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Menu from './Core/Menu';
import Profile from './user/Profile';
import Users from './user/Users';
import EditProfile from './user/EditProfile';
import PrivateRoute from './auth/PrivateRoute';
import {connect} from 'react-redux';
import AllPosts from './posts/AllPosts';
import AddPost from './posts/AddPost';
import Topics from './posts/Topics';
import Comments from './components/Comments';
import MostLikedPosts from './posts/MostLikedPosts';
import MostCommentedPosts from './posts/MostCommentedPosts';
import SinglePost from './posts/SinglePost';
import EditPost from './posts/EditPost';
import CommentsList from './components/CommentsList';
import Feed from './Core/Feed/Feed';


function MainRouter({ currentUser }){

    return (
        <div>
            <Router>
                <Menu currentUser={ currentUser && currentUser }></Menu>
                <Switch>
                    <Route exact path="/" component={Home}></Route>
                    <Route exact path="/signup" component={Signup}></Route>
                    <Route exact path="/signin" component={Signin}></Route>
                    <PrivateRoute exact path="/user/:userId" component={Profile}></PrivateRoute>
                    <PrivateRoute exact path="/allusers" component={Users}></PrivateRoute>
                    <PrivateRoute exact path="/user/edit/:userId" component={EditProfile}></PrivateRoute> 
                    <PrivateRoute exact path="/post/create" component={AddPost}></PrivateRoute> 
                    <Route exact path="/posts/allposts" component={AllPosts}></Route>
                    <Route exact path="/rankings" component={Topics}/>    
                    <Route exact path="/post/:postId" component={SinglePost}></Route>
                    <PrivateRoute exact path="/comments" component={Comments}></PrivateRoute>
                    <Route exact path="/rankings/most_liked" component={MostLikedPosts}></Route>
                    <Route exact path="/rankings/most_commented" component={MostCommentedPosts}></Route>
                    <PrivateRoute exact path="/posts/feed/:userId" component={Feed}></PrivateRoute>
                    <PrivateRoute exact path="/post/edit_post/:postId" component={EditPost}></PrivateRoute>
                    <Route exact path="/comments" component={CommentsList}></Route>
                </Switch>
            </Router>
        </div>
    )

};


const mapStateToProps = ( {user: {currentUser}} ) => ({
    currentUser
})

export default connect(mapStateToProps, null )(MainRouter);