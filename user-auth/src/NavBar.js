import React, {useState} from "react";
import { Link,Route,withRouter } from "react-router-dom";

import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import Account from "./Account";
import NotesComponent from "./NotesComponent";
import PvtRoute from "./PvtRoute";

const NavBar=(props)=>{
    const {isLoggedIn,handleAuth} = props

    return(
        <div>
            <ul>
                <li> <Link to='/' >Home</Link> </li>
                {
                    isLoggedIn ? (<>
                            <li> <Link to='/account' >Account</Link> </li>
                            <li> <Link to='/notes' >My notes</Link> </li>
                            <li> <Link onClick={()=>{
                                if(window.confirm('Sure you wanna log out?')){
                                    localStorage.removeItem('token')
                                    alert('successfully logged out')
                                    handleAuth()
                                    props.history.push('/')
                                }
                            }}  >Log-out</Link> </li>
                        </>) : (<>
                            <li> <Link to='/register' >Register</Link> </li>
                            <li> <Link to='/login' >Log-in</Link> </li>
                        </>)
                }
                
            </ul>
            
            <Route path='/' component={Home} exact={true} ></Route>
            <Route path='/register' component={Register} exact={true} ></Route>
            <Route path='/login' render={(props)=>{
                return <Login
                    {...props}
                    handleAuth={handleAuth}
                />
            }} exact={true} ></Route>
            <PvtRoute path='/account' component={Account} exact={true} />
            <PvtRoute path='/notes' component={NotesComponent} exact={true} />
        </div>
    )
}

export default withRouter(NavBar)