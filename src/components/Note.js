import noteService from '../services/notes1'
 

const Note = ({note,notes,setNotes})=>{
    
const handleDeleteChange =()=>{
    console.log(note,notes,setNotes)
    const request = window.confirm(`Delete ${note.name}?`)
    if (request){
        noteService.del(note.id).then(()=>{
            const updatedNotes = notes.filter(theNotes=>theNotes.id!==note.id)
            console.log(updatedNotes)
            setNotes(updatedNotes) 
        })
         //curly brackets used here to bunch multiple lines for the callback function executed when promise is fulfilled 
        // noteService.del(note.id)
        // const updatedNotes = notes.filter(theNotes => theNotes.id!==note.id)
        // setNotes(updatedNotes)
    }
}
 
    return (
        <li className = 'note'>
        {note.name} {note.number} <button onClick = {handleDeleteChange}>delete</button>
        </li>
    )
}

export default Note