import NewNote from './components/AnecdoteForm'
import NoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
// import noteService from './services/anecdotes'
import { initializeNotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    // noteService
    //   .getAll().then(notes => dispatch(setNotes(notes)))
    dispatch(initializeNotes())
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <NoteList />
      <NewNote />
    </div>
  )
}

export default App