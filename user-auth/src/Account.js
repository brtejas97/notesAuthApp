import React, {useState,useEffect} from "react";
import axios from "axios";

const Account=(props)=>{
    const [user,setUser] = useState({})

    useEffect(()=>{
        axios.get('http://dct-user-auth.herokuapp.com/users/account',{
            headers:{
                'x-auth': localStorage.getItem('token')
            }
        })
            .then((response)=>{
                // console.log(response.data)
                setUser(response.data)
            })
            .catch((err)=>{
                alert(err.message)
            })
    },[])

    return(
      <div>
            <h2>User account</h2>
            {
                Object.keys(user).length>0 && (
                    <>
                        <h3>Name - {user.username.toUpperCase()}</h3>
                        <h3>Email - {user.email}</h3>
                        <h3>Account created on - {user.createdAt.slice(0,7)}</h3>
                    </>
                )
            }
      </div>
    )
}

export default Account