import { useDispatch } from 'react-redux'
import { createNote } from '../reducers/anecdoteReducer'
// import noteService from '../services/anecdotes'
const NewNote = () => {
	const dispatch = useDispatch()
	
	const createNew = async (event) => {
	event.preventDefault()
	const content = event.target.note.value
	event.target.note.value = ''
	// const newNote = await noteService.createNew(content)
    dispatch(createNote(content))
	// dispatch(createNote(content))
	}

	return (
		<div>
			<h2>create new</h2>
      <form onSubmit={createNew}>
        <div><input name="note"/></div>
        <button type="submit">create</button>
      </form>
		</div>
	)
}
export default NewNote
