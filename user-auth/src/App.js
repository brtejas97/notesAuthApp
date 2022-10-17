import React, { useState, useEffect } from "react";

import NavBar from "./NavBar";

const App=(props)=>{
    const [isLoggedIn,setIsLoggedIn] = useState(false)

    const handleAuth=()=>{
        setIsLoggedIn(!isLoggedIn)
    }

    useEffect(()=>{
        if(localStorage.getItem('token')){
            handleAuth()
        }
    },[])

    return(
        <div  style={{fontFamily:'verdana'}}>
            <h2>User Authentication</h2>
            <hr/>
            <NavBar isLoggedIn={isLoggedIn} handleAuth={handleAuth} />
        </div>
    )
}

export default App