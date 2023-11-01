import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getNotes, createNote, updateNote } from './requests'
import { useNotificationDispatch } from './NotificationContext'
import Notification from './components/Notification'

const App = () => {
  // const handleVote = (anecdote) => {
  //   console.log('vote')
  // }

  // const anecdotes = [
  //   {
  //     "content": "If it hurts, do it more often",
  //     "id": "47145",
  //     "votes": 0
  //   },
  // ]
  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()
  
  const newNoteMutation = useMutation(createNote, {
    onSuccess: (newNote) => {
      const notes = queryClient.getQueryData('notes')
      queryClient.setQueryData('notes', notes.concat(newNote))
    },
    onError: (err) => {
      console.log(err.response)
      dispatch({ type:'ERROR',payload: err.response.data.error })
      setTimeout(()=>dispatch({ type:'RESET'}),2000)
    }
  })

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newNoteMutation.mutate({ content, votes: 0 })
    dispatch({ type:'CREATE',payload: content })
    setTimeout(()=>dispatch({ type:'RESET'}),2000)
  }

  const updateNoteMutation = useMutation(updateNote, {
    onSuccess: (newNote) => {
      // queryClient.invalidateQueries('notes')
      const notes = queryClient.getQueryData('notes')
      const noteToChange = notes.find(n => n.id === newNote.id)
      const changedNote = { 
        ...noteToChange, 
        votes: noteToChange.votes+1
      }
      queryClient.setQueryData('notes', notes.map(note => note.id !== newNote.id ? note : changedNote ))
      // console.log(notes)
    }
  })

  const handleVote = (note) => {
    updateNoteMutation.mutate({...note, votes: note.votes+1 })
    dispatch({ type:'VOTE',payload: note.content })
    setTimeout(()=>dispatch({ type:'RESET'}),2000)
  }

  const result = useQuery('notes', getNotes, {
    refetchOnWindowFocus: false,
    retry: false
  })

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if ( result.isError ) {
    return <div>service is not available...</div>
  }

  const anecdotes = result.data
  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification/>
      <div>
        <h3>create new</h3>
        <form onSubmit={addNote}>
          <input name='anecdote' />
          <button type="submit">create</button>
        </form>
    </div>
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
