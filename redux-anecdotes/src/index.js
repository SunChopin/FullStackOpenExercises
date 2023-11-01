import React from 'react'
import ReactDOM from 'react-dom/client'
// import { createStore, combineReducers  } from 'redux'
//import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'
//import reducer from './reducers/anecdoteReducer'
//import filterReducer from './reducers/filterReducer'

// const reducerCombined = combineReducers({
//   notes: reducer,
//   filterNotes: filterReducer
// })

// const store = createStore(reducerCombined)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)