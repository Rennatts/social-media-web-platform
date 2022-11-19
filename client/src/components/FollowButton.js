import React from 'react';
import { subscribe, unsubscribe } from '../redux/actions/userActions';

function FollowButton({ 
    handleButtonClick, 
    following, 
    userId, 
    token, 
    followId,
}) {

    async function followUser() {
        const userData = await subscribe(userId, followId, token);
        if(userData.error){
            console.log(userData.error);
        } else{
          handleButtonClick(userData.data);
        }
    };

    async function unfollowUser() {
        const userData = await unsubscribe(userId, followId, token);
        if(userData.error){
            console.log(userData.error);
        } else{
          handleButtonClick(userData.data);
        }
    }


    return (
        <div className = "follow_container">
            <div className="follow_box">
                {
                following ? (
                <button 
                onClick={()=> unfollowUser()}
                className = "unfollow_btn">
                    Unfollow
                </button>
                ) : (
                <button 
                className = "follow_btn"
                onClick={()=> followUser()}>
                    Follow
                </button>
                )
                }
            </div>   
        </div>
    )
};


export default FollowButton;
