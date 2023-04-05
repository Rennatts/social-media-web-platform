import React, { useState, useEffect } from 'react';
import { NavLink, Link, withRouter, useHistory } from 'react-router-dom';
import { isAuthenticated, signout, brandSignout  } from './../auth/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Menu.css';



const Menu = ({ currentUser }) => {
    const [header, setHeader] = useState("header")

    const listenScrollEvent = (event) => {
        if (window.scrollY < 73) {
            return setHeader("header")

        } else if (window.scrollY > 70) {
            return setHeader("header2")
        } 
    }

    useEffect(() => {
        window.addEventListener('scroll', listenScrollEvent);

        return () => window.removeEventListener('scroll', listenScrollEvent);
        
    }, []);


    let history = useHistory();

    console.log("isAuthenticated", isAuthenticated());



    return (
        <div className={header}>
            {!isAuthenticated() && (
                <> 
                </>
            )}   
            
            {isAuthenticated() && (
                <>
                <div className='nav'>
                    <NavLink
                    exact to={"/"}
                    activeStyle={{
                        fontWeight: "bold",
                        color: "#314191",
                    }}
                    className="nav_link_active" 
                    >
                        <i className="fas fa-home"></i>
                    </NavLink>

                    <NavLink
                    exact to={`/posts/feed/${isAuthenticated().user._id}`}
                    activeStyle={{
                        fontWeight: "bold",
                        color: "#314191",
                    }}
                    className="nav_link_active" 
                    >
                        <i className="fas fa-sliders"></i>
                    </NavLink>

                    <NavLink
                    exact to={"/trading/most_liked"}
                    activeStyle={{
                        fontWeight: "bold",
                        color: "#314191",
                    }}
                    className="nav_link_active" 
                    >
                        <i style={{color: "black"}}className="fas fa-heart"></i>
                    </NavLink>

                    <NavLink
                    exact to={"/trading/most_commented"}
                    activeStyle={{
                        fontWeight: "bold",
                        color: "#314191",
                    }}
                    className="nav_link_active" 
                    >
                        <i style={{color: "black"}} className="fas fa-comment"></i>
                    </NavLink>

                    <NavLink 
                        exact to={"/allusers"}
                        activeStyle={{
                            fontWeight: "bold",
                            color: "#314191"
                        }}
                        className="nav_link_active" 
                        href="#"><i className="fas fa-users"></i>
                    </NavLink>
                </div>

                <div className='right_nav'>
                    <NavLink exact to={`/post/create`}  
                        className="nav_link_active"
                        activeStyle={{
                            fontWeight: "bold",
                            color: "#314191"
                        }}
                        href="#"><i className="far fa-plus-square"></i>
                    </NavLink> 

                    <NavLink exact to={`/user/${isAuthenticated().user._id}`}  
                        className="nav_link_active"
                        activeStyle={{
                            fontWeight: "bold",
                            color: "#314191"
                        }}
                        href="#">
                        Profile
                    </NavLink> 

                    <NavLink to={"/#"}
                        activeStyle={{
                            fontWeight: "bold",
                            color: "#314191"
                        }}
                        className="nav_link_active" 
                        onClick={()=> signout(()=> history.push('/'))}>
                            LogOut
                    </NavLink>
                </div>
                </>

            )}  
        </div>
    )
}



export default withRouter(Menu);