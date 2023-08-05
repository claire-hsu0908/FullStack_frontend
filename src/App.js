import { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes1'
import './index.css'


const App = () => {
  //create a button mapping it after each note element 
  //button executes function that creates an alert with event handler attached to either answer
  //use the notesServce.update() to 


  const[notes,setNotes] = useState([])
  const [filteredNotes, setFilteredNotes] = useState('')
  const [name,setName] = useState('')
  const [newNumber,setNumberChange] = useState('')
  const [errorMessage,setErrorMessage] = useState('')

  useEffect(() => {
    noteService
      .getAll()
      .then(response => {
        setNotes(response)
      })
  }, [])



  const handleFilterChange = (event)=>{
    setFilteredNotes(event.target.value)
  }

  const notesToShow = filteredNotes===''?notes:notes.filter((note)=>note.name.toLowerCase().includes(filteredNotes.toLowerCase())|| note.number.toLowerCase().includes(filteredNotes.toLowerCase()))


  const handleNameChange = (event)=>{
    setName(event.target.value)
  }
  
  const handleNumberChange = (event)=>{
    setNumberChange(event.target.value)
  }

  const addNote =(event)=>{
    let vary = true
    event.preventDefault()
    //iterate through notes to check if there an existing content matching this one if there is do confirm function otherwise continue with rest 
    //make confirm function 
    //send HTTP Post request to update note if confirm = true
    const noteObject = {
      content:name,
      number:newNumber
    }
    
    notes.map((note)=>{
      //first note added that matches previous one one does not satisfy the if(note.content===name) condition 
      // console.log(note.name.toLowerCase().trim(),typeof(note.name.toLowerCase()))
      // console.log(name.toLowerCase().replace(/\s/g, ''),typeof(name.toLowerCase()))
      // console.log(name.toLowerCase()===note.name.toLowerCase())

      if(note.name.toLowerCase().replace(/\s/g, '')===name.toLowerCase().replace(/\s/g, '')){
        console.log('Same Name')
        vary = false
        const check = window.confirm(`${note.name} is already added to phonebook, replace the old number with a new one?`)
        if(check){
          const updatedNote = {...note,number:newNumber}
          noteService
            .update(note.id,updatedNote).then(()=>
            {const updatedNotes = notes.map(n=>n.name.toLowerCase().replace(/\s/g, '')===name.toLowerCase().replace(/\s/g, '')?updatedNote:n)
            setNotes(updatedNotes) 
            setName('')
            setNumberChange('')
            console.log('success')}
            ).catch(error=>{
              setErrorMessage(error.response.data.error)
              setTimeout(()=>{
                setErrorMessage(null)
              },5000)
              console.log(error.response.data.error)
            }
            )
        }
        return null
      }
    })

if (vary === true){
  noteService
          .create(noteObject)
          .then(response=>{
          setNotes(notes.concat(response))
          setName('')
          setNumberChange('')
      })
      .catch(error=>{
        setErrorMessage(error.response.data.error)
        setTimeout(()=>{
          setErrorMessage(null)
        },5000)
        console.log(error.response.data.error)
      }
      )
    }
  }

// const addNote = (event) => {
//   event.preventDefault()
//   const noteObject = {
//     content: name,
//     number:newNumber
//   }
//   noteService
//     .create(noteObject)
//     .then(response=>{
//       setNotes(notes.concat(response))
//       setName('')
//       setNumberChange('')
//     })
// }
//for original when only adding a new note
const Notification =({message,status})=>{
  if(message===''){
    return null
  }
  return(
    <div className = {status}>
    {message}
    </div>
  )
}


return(
  
    <div>
      <h1>Phonebook</h1>
      <Notification message = {errorMessage} status = {'error'} />
        <form>
            filter shown with <input type = "text" value = {filteredNotes} onChange = {handleFilterChange}/>
        </form>
      <h1>add a new</h1>
      <form onSubmit = {addNote}>
        <div>
        name: <input type = "text" value = {name} onChange = {handleNameChange}/> 
        </div>
        <div>
        number: <input type = "text" value = {newNumber} onChange = {handleNumberChange}/>
        </div>
        <div>
        <button type = "submit">add</button>
        </div>
      </form>
        <h1>Numbers</h1>
        <ul>
          {notesToShow.map(note=><Note key={note._id} 
            note={note} notes = {notes} setNotes = {setNotes}/>
            )}
        </ul>
  </div>
)
          }

export default App

