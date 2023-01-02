import React, { useEffect, useState }  from 'react';
import { useDispatch, connect } from 'react-redux';
import { isLogged } from './../auth/index';
import { getAllUsers } from '../redux/actions/userActions';
import {Link} from 'react-router-dom';
import './css/Users.css';
import Moment from "react-moment";
import DefaultProfile from './../images/avatar.png';


function Users({ users, userError }) {
    const dispatch = useDispatch();  
    const jwt = isLogged();

    const [error, setError] = useState(null);
    
    useEffect(() => {
        if ( userError && userError !== null ) {
            setError(userError);
        }
        dispatch(getAllUsers(jwt && jwt.token));
    }, [dispatch, userError]);


    function showError() {
        return error && <div className="alert alert-danger">{error}</div>
    };

    console.log("users", users)



    return (
        <div className="users_main_container">
            {showError()}
            <div className="users_card_body">
                <ul className="users_list_group">
                    {
                    users.users && users.users.map((user, index) => (
                        <Link className="users_link"
                        to={`/user/${user._id}`} 
                        style={{textDecoration: "none"}}
                        key={index}>
                            <li className="list_users" key={index}>
                                <div className='header_box'>
                                    <img 
                                    className="user_profile_img"
                                    src={user.url} 
                                    alt= {user.name}
                                    onError= {i => (i.target.src= `${DefaultProfile}`)}
                                    ></img>
                                    <h4 className="user_name">{user.name}</h4>
                                </div>
                                <div className='info_box'>
                                   <p>followers: {user.followers.length}</p>
                                   <p>Profile since <Moment className="date" format="YYYY-MM-DD">{user.created}</Moment></p>
                                </div>
                            </li>
                        </Link>
                    ))
                    }
                </ul>
            </div>
        </div>
    );

};


const mapStateToProps = ({ user: { users, userError  }}) => ({
    users,
    userError
})

export default connect( mapStateToProps, null )(Users);

