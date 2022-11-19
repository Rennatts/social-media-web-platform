import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import io from 'socket.io-client';
import { GLOBALTYPE } from './redux/actions/socketAction';
import { isLogged } from './auth';


const SocketClient = () => {
    const dispatch = useDispatch();
    const [socket, setSocket] = useState(null);
    const jwt = isLogged();

    const userId = jwt.user._id;

    useEffect(() => {
        const socket = io('http://localhost:5050');
        setSocket(socket);
        dispatch({type: GLOBALTYPE.SOCKET, payload: socket})
        return () => socket.close()
    },[dispatch])


    useEffect(() => {
        if(socket){
            socket.emit('joinRoom', userId)
        }

    },[socket, userId]);

    return <></>
    
}

export default SocketClient
