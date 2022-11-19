import React, { Component } from 'react';
import { follow, unfollow } from '../user/apiUser';



class FollowProfileButton extends Component {
    followClick = () => {
       this.props.onButtonClick(follow) 
    }

    unfollowClick = () => {
        this.props.onButtonClick(unfollow) 
     }
    render() {
        return (
            <div className="d-inline-block mt-5">
                {!this.props.following ? (
                    <button 
                    className="btn btn-success btn-raised mr-5"
                    onClick = {this.followClick}>
                    Follow
                    </button>

                ) : (
                    <button 
                    className="btn btn-warning btn-raised mr-5"
                    onClick = {this.unfollowClick}>
                    UnFollow
                    </button> 
                )}
            </div>
        );
    }
}

export default FollowProfileButton;
