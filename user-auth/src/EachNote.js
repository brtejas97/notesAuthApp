import React, {useState} from "react";

import FormNotes from "./FormNotes.js"

const EachNote = (props) => {
    const {title,body,id,handleNoteRemoval} = props
    const [toggle,setToggle] = useState(false)

    const handleRemove = (id,title,body) => {
        handleNoteRemoval(id,title,body)
    }

    const handleUpdate = (id) => {
        setToggle(!toggle)
    }

    const handleUpdCancel = () => {
        setToggle(!toggle)
    }

    return(
        <div style={{paddingRight:'550px'}}>
            {
                toggle ? 
                <>
                    <FormNotes updTitle={title} updBody={body} id={id} toggle={toggle} setToggle={setToggle} />
                    <input type="button" value="cancel update" onClick={handleUpdCancel} />
                </> : 
                <>
                    <span>title: </span> <b> {title}</b>
                    <br/>
                    <span>body: </span> <b> {body}</b>
                    <br/>
                    <input type="button" value="remove" onClick={()=>handleRemove(id,title,body)} /> &nbsp; &nbsp; 
                    <input type="button" value="update" onClick={()=>{
                        handleUpdate(id)
                    }} />
                </>
            }
            
            <br/> <hr/> <br/>
        </div>
    )
}

export default EachNote