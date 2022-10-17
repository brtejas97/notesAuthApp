import React, {useState} from "react";

import axios from 'axios'

import './Login.css'

const Login=(props)=>{
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [formErrors,setFormErrors] = useState('')

    const handleChange=(e)=>{
        const attr=e.target.name
        if(attr==='un'){
            setEmail(e.target.value)
        }
        else if(attr==='pw'){
            setPassword(e.target.value)
        }
    }

    const errors={}

    const runValidation=()=>{
        if(email.length===0){
            errors.email='email field cannot be blank'
        }
        if(password.length===0){
            errors.password='password field cannot be blank'
        }
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        runValidation()
        if(Object.keys(errors).length===0){
            setFormErrors({})
            const credentials={
                email:email,
                password:password
            }
            axios.post('http://dct-user-auth.herokuapp.com/users/login',credentials)
                .then((response)=>{
                    const result = (response.data)
                    if(result.hasOwnProperty('errors')){
                        alert(result.errors)
                    }else{
                        alert('successfully logged in')
                        localStorage.setItem('token',result.token)
                        props.history.push('/')
                        props.handleAuth()
                    }
                })
                .catch((err)=>{
                    alert(err)
                })
        }
        else{
            setFormErrors(errors)
        }
    }

    return(
        <div style={{textAlign:'center',fontSize:'25px'}}>
            <h3>Login</h3>
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder="email id" name='un' value={email} onChange={handleChange} /> <br/>
                {formErrors.email && <span id="warn">{formErrors.email}</span>} <br/>
                <input type='password' placeholder="password" name='pw' value={password} onChange={handleChange} /> <br/>
                {formErrors.password && <span id="warn">{formErrors.password}</span>} <br/>
                <input type='submit' value='login' />
            </form>
        </div>
    )
}

export default Login