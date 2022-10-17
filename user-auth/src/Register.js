import React, {useState, useEffect} from "react";
import axios from 'axios'

import './Register.css'

const Register=(props)=>{
    const [username,setUserName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [formErrors,setFormErrors] = useState({})
    const [userReg,setUserReg] = useState({})

    const handleChange=(e)=>{
        const attr=e.target.name
        if(attr==='un'){
            setUserName(e.target.value)
        }
        else if(attr==='em'){
            setEmail(e.target.value)
        }
        else if(attr==='ps'){
            setPassword(e.target.value)
        }
    }

    const errors={}

    const runValidation=()=>{
        if(username.length===0){
            errors.username='name field cannot be blank'
        }
        if(email.length===0){
            errors.email='email field cannot be blank'
        }
        else if(!(email.includes('@')&&email.includes('.com'))){
            errors.email='please enter a valid email id'
        }
        if(password.length===0){
            errors.password='password field cannot be blank'
        }
        else if(password.length<8||password.length>128){
            errors.password='please ensure your password length is between 8 to 128'
        }
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        runValidation()
        if(Object.keys(errors).length===0){
            setFormErrors({})
            const result={
                username:username,
                email:email,
                password:password
            }
            setUserReg(result)
            console.log(result)

            axios.post('http://dct-user-auth.herokuapp.com/users/register',result)
                .then((response)=>{
                    const result=response.data
                    //although after vadidations, error response is mostly unexpected.. but if any
                    if(result.hasOwnProperty('errors')){
                        alert(result.message)
                    }
                    else{
                        alert('registration successful')
                        props.history.push('/login')
                    }
                })
                .catch((err)=>{
                    alert(err.message)
                })

            setUserName('')
            setEmail('')
            setPassword('')
        }
        else{
            setFormErrors(errors)
        }
    }
    
    // useEffect(()=>{
    //     // setFormErrors({})
    //     // console.log(userReg)
    // },[userReg])

    return(
        <div style={{textAlign:'center',fontSize:'20px' }} >
            <h3>Register here</h3>
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder="username" name="un" value={username} onChange={handleChange} /> <br/> {formErrors.username&&<span id="valWar" >{formErrors.username}</span>} <br/> <br/>
                <input type='text' placeholder="email id" name="em" value={email} onChange={handleChange} /> <br/> {formErrors.email&&<span id="valWar" >{formErrors.email}</span>}  <br/> <br/>
                <input type='password' placeholder="password" name="ps" value={password} onChange={handleChange} /> <br/> {formErrors.password&&<span id="valWar" >{formErrors.password}</span>} <br/> <br/>
                <input type='submit' value='register' />
            </form>
        </div>
    )
}

export default Register