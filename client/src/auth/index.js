export const isAuthenticated = () => {
    if(typeof window === "undefined") {
        return false
    }

    if(localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"))
    } else {
        return false
    }

};



export const signout = (next) => {
    if(typeof window !== "undefined"){
        localStorage.removeItem("jwt")
    } 
    next()
    return fetch(`http://localhost:5050/auth/signout`, {
        method: "GET"
    })
    .then(res => {
        return res.json()

    })
    .catch(err => console.log(err))

};




export const updateUser = ( user ) => {
    if(typeof window !== "undefined") {
        if(localStorage.getItem('jwt')) {
            let auth = JSON.parse(localStorage.getItem('jwt'))
            auth.user = user 
            localStorage.setItem('jwt', JSON.stringify(auth))
        }
        
    };
};


export const saveUserToLocalStorage = (jwt) => {
    localStorage.setItem("jwt", JSON.stringify(jwt));
}


export const isLogged = () => {
    if(localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"));
    } else {
        return false;
    }
}


export const logout = (cb) => {
    localStorage.removeItem("jwt");
    document.cookie = "t=;expires=Thu, 01 Jan 1970 00:00:00 UCT;path=/";
    cb();
}



export const checkAuth = (userId) => {
    return isLogged().user._id === userId;
}




export const checkBrandAuth = (branduserId) => {
    return isLogged().branduser._id === branduserId;
}


