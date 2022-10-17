import React from "react";

import FormNotes from "./FormNotes";
import NotesList from "./NotesList";

const NotesComponent=(props)=>{
    

    return(
        <div>
            {
                localStorage.getItem('token') ? (
                    <div> 
                        <h2>Your Notes..</h2>
                        <NotesList/>   
                        <FormNotes/>
                    </div>
                ) : <h3>log in first to access your notes</h3>
            }
            
        </div>
    )
}

export default NotesComponent