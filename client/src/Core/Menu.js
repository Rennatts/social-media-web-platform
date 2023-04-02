import React, { useState, useEffect } from 'react';
import { NavLink, Link, withRouter, useHistory } from 'react-router-dom';
import { isAuthenticated, signout, brandSignout  } from './../auth/index';
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

                    <NavLink to="/notifications" className="nav_link_active"
                        activeStyle={{
                            fontWeight: "bold",
                            color: "#314191"
                        }}
                        href="#"><i className="far fa-bell"></i>
                    </NavLink> 

                    <NavLink exact to={`/user/${isAuthenticated().user._id}`}  
                        className="nav_link_active"
                        activeStyle={{
                            fontWeight: "bold",
                            color: "#314191"
                        }}
                        href="#">
                        My profile
                    </NavLink> 

                    <NavLink to={"/#"}
                        activeStyle={{
                            fontWeight: "bold",
                            color: "#314191"
                        }}
                        className="nav_link_active" 
                        onClick={()=> signout(()=> history.push('/'))}>
                            Logout
                    </NavLink>
                </div>
                </>

            )}  
        </div>
    )
}



export default withRouter(Menu);