import React from 'react';
import { useHistory } from 'react-router-dom';
import './css/FollowComponent.css';
import DefaultProfile from './../images/avatar01';


function FollowComponent({data, trigger, setTrigger}) {
    const history = useHistory();

    return (
        trigger ? (
        <div className="popup">
            <div className="popup-inner">
                {data && data.map((user) => (
                <div 
                    className="profile_container"
                    key={user._id}
                    onClick={()=> history.push(`/user/${user._id}`)}>                                  
                    {/* <img 
                        src={user.url} 
                        className="profile_image"
                        onError= {i => (i.target.src= `${DefaultProfile}`)}
                        alt= "userphoto"
                    ></img> */}
                    <h4 className="mt-3">{user.name}</h4>
                </div>   
                ))}
            </div>
            <br></br>
            <div>
                <button onClick={()=> setTrigger(!trigger)} className="close btn">Close</button>
            </div>
        </div>
        ) : ("")

    );
};

export default FollowComponent
