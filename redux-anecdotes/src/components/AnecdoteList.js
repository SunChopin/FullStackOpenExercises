import { useSelector, useDispatch } from 'react-redux'
import { updateVote } from '../reducers/anecdoteReducer'
import { notification } from '../reducers/notificationReducer'

const NoteList = () => {
	const anecdotes = useSelector(({notes, filterNotes}) => notes.filter(note => note.content.toLowerCase().includes(filterNotes.toLowerCase())))
	const dispatch = useDispatch()

	const vote = (anecdote) => {
		// console.log('vote',id, content)
		dispatch(updateVote(anecdote.id, anecdote))
    dispatch(notification(anecdote.content, 2))
    // setTimeout(() => {dispatch(removeNotification())},2000)
	}

	return(
		<div>
      {anecdotes.toSorted((a, b) => a.votes - b.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
		</div>
	)
}

export default NoteList