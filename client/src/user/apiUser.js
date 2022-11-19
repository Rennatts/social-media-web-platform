
export const read = (userId, token ) => {
    return fetch(`http://localhost:5050/user/${userId}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    })
    .then(res => {
        return res.json();
    })
    .catch(error => console.log(error))
};


export const list = () => {
    return fetch(`http://localhost:5050/users/allusers`, {
        method: "GET",
    })
    .then(res => {
        return res.json();
    })
    .catch(error => console.log(error));

};




export const remove = (userId, token ) => {
    return fetch(`http://localhost:5050/user/${userId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    })
    .then(res => {
        return res.json();
    })
    .catch(error => console.log(error))
};


export const update = (userId, token) => {
    fetch(`http://localhost:5050/users/user/${userId}`, {
        method: "GET", 
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    })
    .then(res => {
        return res.json()
    })
    .catch(error => console.log(error))
}


export const follow = ( userId, token, followId ) => {

    return fetch("http://localhost:5050/users/user/follow", {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userId, followId })
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))

};




export const unfollow = ( userId, token, followId ) => {
    try{ return fetch("http://localhost:5050/users/user/unfollow", {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userId, followId })
    })
    .then(response => {
        return response.json();
    })
    } catch(err) {
        console.log("catch:", err)
    }

};






export const likepost = (userId, token, postId) => {
    fetch(`http://localhost:5050/posts/post/likepost`, {
        method: "PUT", 
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({userId, postId})
    })
    .then(response => {
        return response.json()
    })
    .catch(error => console.log(error))
}



export const unlikepost = (userId, token, postId) => {
    fetch(`http://localhost:5050/posts/post/unlikepost`, {
        method: "PUT", 
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({userId, postId})
    })
    .then(response => {
        return response.json()
    })
    .catch(error => console.log(error))
}




export const comment = (userId, token, postId, comment) => {
    fetch(`http://localhost:5050/posts/post/addcomment`, {
        method: "PUT", 
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({userId, postId, comment})
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
};




export const deletecomment = (userId, token, postId, comment) => {
    fetch(`http://localhost:5050/posts/post/deletecomment`, {
        method: "PUT", 
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({userId, postId, comment})
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}