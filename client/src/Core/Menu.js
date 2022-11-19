import React from 'react';
import { NavLink, Link, withRouter, useHistory } from 'react-router-dom';
import { isAuthenticated, signout, brandSignout  } from './../auth/index';
import './Menu.css';


const Menu = ({ currentUser }) => {
    let history = useHistory();

    console.log(isAuthenticated());

    return (
        <div className="main_nav">
                <button class="menu-toggler active">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <div className="nav">
                    <NavLink 
                        exact to="/" 
                        activeStyle={{
                            fontWeight: "bold",
                            color: "#a4f5e5",

                        }}
                        className="nav_link_active" 
                        href="#"><i class="fas fa-home"></i>
                    </NavLink>

                    <NavLink to={`/rankings`}  
                        className="nav_link_active"
                        activeStyle={{
                            fontWeight: "bold",
                            color: "#a4f5e5"
                        }}
                        href="#"><i class="fas fa-medal"></i>Rankings
                    </NavLink>  

                    {isAuthenticated().user && (
                    <>
                        <NavLink 
                            exact to="/allusers" 
                            activeStyle={{
                                fontWeight: "bold",
                                color: "#a4f5e5"
                            }}
                            className="nav_link_active" 
                            href="#"><i class="fas fa-users"></i>Users
                        </NavLink>

                        
                        <NavLink to={`/posts/feed/${isAuthenticated().user._id}`}  
                        className="nav_link_active"
                        activeStyle={{
                            fontWeight: "bold",
                            color: "#a4f5e5"
                        }}
                        href="#"><i class="fas fa-mail-bulk"></i>
                        Feed
                        </NavLink>  
                                            
                        <NavLink 
                        exact to={`/posts/allposts`}  
                        className="nav_link_active"
                        activeStyle={{
                            fontWeight: "bold",
                            color: "#a4f5e5"
                        }}
                        href="#"><i class="fas fa-photo-video"></i>Posts
                        </NavLink>  
                        
                    </> 
                    )}

                </div>

                <div className="right_nav">
                {isAuthenticated().user && (
                    <> 

                        <NavLink to={`/post/create`}  
                            className="nav_link_active"
                            activeStyle={{
                                fontWeight: "bold",
                                color: "#a4f5e5"
                            }}
                            href="#"><i class="far fa-plus-square"></i>
                        </NavLink> 

                        <NavLink to="/notifications/" className="nav_link_active"
                        activeStyle={{
                            fontWeight: "bold",
                            color: "#a4f5e5"
                        }}
                        href="#"><i class="far fa-bell"></i>
                        </NavLink> 

                        <NavLink to="/notifications/" className="nav_link_active"
                        activeStyle={{
                            fontWeight: "bold",
                            color: "#a4f5e5"
                        }}
                        href="#"><i class="fas fa-folder-plus"></i>
                        </NavLink> 

                        <NavLink to={`/user/${isAuthenticated().user._id}`}  
                        className="nav_link_active"
                        activeStyle={{
                            fontWeight: "bold",
                            color: "#a4f5e5"
                        }}
                        href="#">
                        {`${isAuthenticated().user.name}´s profile`} 
                        </NavLink>  

                        <Link
                        activeStyle={{
                            fontWeight: "bold",
                            color: "#a4f5e5"
                        }}
                        className="nav_link_active" 
                        onClick={()=> signout(()=> history.push('/'))}>
                            <i class="fas fa-sign-out-alt"></i>
                        </Link>
                                
                    </> 
                    )}
                </div>
                    
                <div className="auth_nav">
                    {!isAuthenticated() && (
                        <> 
                            <NavLink 
                            exact to={"/signin"}
                            activeStyle={{
                                fontWeight: "bold",
                                color: "#a4f5e5"
                            }}
                            className="nav_link_active" 
                            href="#"><i class="fas fa-sign-in-alt"></i>Sign In</NavLink> 
                                
                            <NavLink 
                            exact to={"/signup"} 
                            activeStyle={{
                                fontWeight: "bold",
                                color: "#a4f5e5"
                            }}
                            className="nav_link_active" 
                            href="#"><i class="fas fa-user-plus"></i>Sign Up</NavLink>
                        </>
                    )}
                </div>            
        </div>
    )
}



export default withRouter(Menu);