import React, {useEffect, useState} from "react";
import axios from "axios"
import EachNote from "./EachNote";

const NotesList=(props)=>{
    const [notesList,setNotesList] = useState([])
    const [removedNote,setRemovedNote] = useState({})
    // console.log(notesList)

    useEffect(()=>{
        axios.get('http://dct-user-auth.herokuapp.com/api/notes',{
            headers:{
                'x-auth':localStorage.getItem('token')
            }
        })
            .then((response)=>{
                setNotesList(response.data)
            })
            .catch((err)=>{
                alert(err)
            })
    },[notesList,removedNote])

    const handleNoteRemoval=(id,title)=>{
        const cnf=window.confirm(`Are you sure you want to delete ${title.toUpperCase()} note `)
        if(cnf){
            axios.delete(`http://dct-user-auth.herokuapp.com/api/notes/${id}`,{
                headers:{
                    'x-auth':localStorage.getItem('token')
                }
            })
                .then((response)=>{
                    console.log(response.data)
                    setRemovedNote(title)
                })
                .catch((err)=>{
                    alert(err.message)
                })
        }
        
    }

    return(
        <div>
            {
                notesList.length>0 ? (
                    <>
                        <h2> Listing Notes - {notesList.length} </h2>
                        <ul>
                            {
                                notesList.reverse().map((ele)=>{
                                    return <EachNote key={ele._id} title={ele.title} body={ele.body} handleNoteRemoval={handleNoteRemoval} id={ele._id}/>
                                })
                            }
                        </ul>
                    </>    
                ) : (
                    <h2> Add you first note now.. </h2>
                )
            }
            
        </div>
    )
}

export default NotesList