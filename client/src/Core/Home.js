import React, { useEffect} from 'react';
import { useDispatch, connect } from 'react-redux'; 
import { isLogged } from './../auth';


function Home() {
    const jwt = isLogged();
    const dispatch = useDispatch();

    return (
        <div className="jubotron">
            <h2>Home</h2>  
            <p className="lead">Welcome to my world</p>
        </div>
    )

};




export default Home;