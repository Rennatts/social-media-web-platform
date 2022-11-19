import React from 'react';
import { Link } from 'react-router-dom';

function RankingComponent() {
    return (
        <header className="header">
            <Link to="/rankings/most_liked"><button className="btn_most_liked">Most liked posts</button></Link>
                
            <Link to="/rankings/most_commented"><button className="btn_most_commented">Most commented posts</button></Link> 

            <Link to="/groupposts"><button className="btn_general_ranking">General ranking</button></Link>
        </header>
    )
    
}

export default RankingComponent;