import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
			// console.log(state)
      return `you voted '${action.payload}'`
    },
    clearNotification(state, action) {
			return null
		}
  }
})

export const notification = (content, sec) => {
  return dispatch => {
    dispatch(setNotification(content))
    setTimeout(() => {
      dispatch(clearNotification())
    }, sec*1000)
  }
}

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer