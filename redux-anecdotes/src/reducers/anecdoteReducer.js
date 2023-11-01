import { createSlice } from '@reduxjs/toolkit'
import noteService from '../services/anecdotes'
// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)

const noteSlice = createSlice({
  name: 'note',
  initialState: [],
  reducers: {
    // createNote(state, action) {
    //   // return [...state, asObject(action.payload)]
    //   state.push(action.payload)
    // },
    voteNote(state, action) {
      const id = action.payload
      const noteToChange = state.find(n => n.id === id)
      const changedNote = { 
        ...noteToChange, 
        votes: noteToChange.votes+1
      }
      return state.map(note =>
        note.id !== id ? note : changedNote 
      )
    },
    appendNote(state, action) {
      state.push(action.payload)
    },
    setNotes(state, action) {
      return action.payload
    }
  }
})

export const initializeNotes = () => {
  return async dispatch => {
    const notes = await noteService.getAll()
    // console.log(notes)
    dispatch(setNotes(notes))
  }
}

export const createNote = content => {
  return async dispatch => {
    const newNote = await noteService.createNew(content)
    dispatch(appendNote(newNote))
  }
}

export const updateVote = (id, noteObject) => {
  return async dispatch => {
    const changedNote = { ...noteObject, votes: noteObject.votes+1 }
    await noteService.updateNew(id, changedNote)
    dispatch(voteNote(id))
  }
}

export const { appendNote, voteNote, setNotes } = noteSlice.actions
export default noteSlice.reducer
// const reducer = (state = initialState, action) => {
//   console.log('state now: ', state)
//   console.log('action', action)

//   switch(action.type) {
//     case 'NEW_NOTE':
//       return [...state, action.payload]
//     case 'VOTE':
//       const id = action.payload.id
//       const noteToChange = state.find(n => n.id === id)
//       const changedNote = { 
//         ...noteToChange, 
//         votes: noteToChange.votes+1
//       }
//       return state.map(note =>
//         note.id !== id ? note : changedNote 
//       )
//     default:
//       return state
//     }
// }

// export const createNote = (content) => {
//   return {
//     type: 'NEW_NOTE',
//     payload: {
//       content,
//       id: getId(),
//       votes: 0
//     }
//   }
// }

// export const voteNote = (id) => {
//   return {
//     type: 'VOTE',
//     payload: { id }
//   }
// }  

// export default reducer