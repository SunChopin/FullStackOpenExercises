import { configureStore } from '@reduxjs/toolkit'
import reducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
	reducer: {
		notes: reducer,
		filterNotes: filterReducer,
		notification: notificationReducer
	}
  
})

export default store