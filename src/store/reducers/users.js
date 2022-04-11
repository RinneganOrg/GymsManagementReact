import { createSlice } from '@reduxjs/toolkit'

export const userReducer = createSlice({
  name: 'users',
  initialState: {
    users: null,
    usersList: []
  },
  reducers: {
    setUsers: (state, action) => {
      state.usersList = action.payload
    },
    authenticate: (state, action) => {
      state.users = action.payload
    },
    signOut: (state) => {
      state.users = null
    }
  },
})

export const { setUsers, authenticate, signOut } = userReducer.actions

export const setUsersAsync = (url) => (dispatch) => {
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((response) => response.json())
    .then((result) => {
      dispatch(setUsers(result.data))
    })
}

export const signUp = (url, body) => (dispatch) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((result) => {
      dispatch(authenticate(result.user))
      return { message: result.message, status: result.success }
    })
}

export const signIn = (url, body) => (dispatch) => {
  return fetch(url, {
    credentials: "same-origin",
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((result) => {
      dispatch(authenticate(result.user))
      return {
        message: result.message,
        status: result.success,
        accessToken: result.accessToken
      }
    })
}
export default userReducer.reducer