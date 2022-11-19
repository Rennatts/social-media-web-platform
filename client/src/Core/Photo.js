import React from 'react';

function Photo({ photo }) {


    return (
        <div>
            <img style={{height: "400px", width: "728px"}} src={`/uploads/${photo}`} alt={photo}></img>
        </div>
    )
};

export default Photo;

