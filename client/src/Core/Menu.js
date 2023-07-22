import React, { useState, useEffect } from 'react';
import { NavLink, Link, withRouter, useHistory } from 'react-router-dom';
import { isAuthenticated, signout, brandSignout  } from './../auth/index';
import { faHome, faThList, faHeart, faComment, faUsers, faPlusSquare, faSquare, faLifeRing, faArrowUpRightDots, faAdd, faHeartCircleBolt, faHeartPulse, faHeartbeat, faGrinHearts, faHeartCirclePlus } from '@fortawesome/free-solid-svg-icons'
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
                        <FontAwesomeIcon icon={faHome} />
                    </NavLink>

                    <NavLink
                        exact to={`/posts/feed/${isAuthenticated().user._id}`}
                        activeStyle={{
                            fontWeight: "bold",
                            color: "#314191",
                        }}
                        className="nav_link_active" 
                        >
                        <FontAwesomeIcon icon={faThList} />
                    </NavLink>


                    <NavLink
                    exact to={"/trading/most_liked"}
                    activeStyle={{
                        fontWeight: "bold",
                        color: "#314191",
                    }}
                    className="nav_link_active"
                    style={{color:"black"}} 
                    >
                        <FontAwesomeIcon icon={faHeartCirclePlus} />
                    </NavLink>

                    <NavLink
                    exact to={"/trading/most_commented"}
                    activeStyle={{
                        fontWeight: "bold",
                        color: "#314191",
                    }}
                    className="nav_link_active" 
                    >
                        <FontAwesomeIcon icon={faComment} />
                    </NavLink>

                    <NavLink 
                        exact to={"/allusers"}
                        activeStyle={{
                            fontWeight: "bold",
                            color: "#314191"
                        }}
                        className="nav_link_active" 
                        href="#">
                        <FontAwesomeIcon icon={faUsers} />
                    </NavLink>
                </div>

                <div className='right_nav'>
                    <NavLink exact to={`/post/create`}  
                        className="nav_link_active"
                        activeStyle={{
                            fontWeight: "bold",
                            color: "#314191"
                        }}
                        href="#">
                        <FontAwesomeIcon icon={faAdd} />
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