import React, {useState,useEffect} from "react";
import axios from "axios";

const FormNotes=(props)=>{
    const {updTitle,updBody,toggle,id,setToggle} = props

    const [title,setTitle] = useState(updTitle ? updTitle : '')
    const [body,setBody] = useState(updBody ? updBody : '')
    const [formErrors,setFormErrors] = useState({})

    const handleChange=(e)=>{
        if(e.target.name==='title') setTitle(e.target.value);
        else setBody(e.target.value);
    }

    const errors={}

    const runValidation=()=>{
        if(title.length===0){
            errors.title='title section cannot be left empty'
        }
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        runValidation()
        if(!errors.title){
            setFormErrors({})
            const note={
                'title':title,
                'body':body
            }
            
            if(!toggle){
                axios.post('http://dct-user-auth.herokuapp.com/api/notes',note,{
                headers:{
                    'x-auth':localStorage.getItem('token')
                    }
                })
                    .then((response)=>{
                        console.log(response)
                    })
                    .catch((err)=>{
                        alert(err)
                    })
                    // setNewNote(newNote)
                    // console.log(note)
                    setTitle('')
                    setBody('')
            }
            else if(toggle){
                axios.put(`http://dct-user-auth.herokuapp.com/api/notes/${id}`,note,{
                headers:{
                    'x-auth': localStorage.getItem('token')
                }
                })
                    .then((response)=>{
                        if(response.data){
                            alert('Updated successfully')
                            setToggle(false)
                        }
                    })
            }
            else{
                setFormErrors(errors)
                console.log(errors)
                // alert(errors.title)
            }
        }
    }
    
    return(
        <div>
            <h2>Add new note</h2>
                <form onSubmit={handleSubmit} >
                    <input type='text' name='title' placeholder="title.." value={title} onChange={handleChange} /> &nbsp;&nbsp; {formErrors.title && <b style={{fontSize:'12px',color:'red'}} > {formErrors.title} </b>}
                    <br/> <br/>

                    <textarea placeholder="body.." name='body' rows='4' cols='25' value={body} onChange={handleChange} />
                    <br/> <br/>

                    <input type='submit' value='submit' />
                </form> 
        </div>
    )
}

export default FormNotes