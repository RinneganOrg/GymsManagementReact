import { createSlice } from '@reduxjs/toolkit'

export const gymReducer = createSlice({
  name: 'gyms',
  initialState: {
    gyms: []
  },
  reducers: {
    setGyms: (state, action) => {
      state.gyms = action.payload
    },
    addGym: (state, action) => {
      state.gyms = [...state.gyms, { ...action.payload, id: state.gyms.length + 1 }]
    },
    editGym: (state, action) => {
      state.gyms = state.gyms.map((gym) => gym._id === action.payload._id ? action.payload : gym)
    }
  },
})

export const { setGyms, addGym, editGym } = gymReducer.actions

export const setGymsAsync = (url) => (dispatch) => {
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then((response) => response.json())
    .then((result) => {
      dispatch(setGyms(result.data))
    })
}

export const addGymAsync = (url, body) => (dispatch) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((result) => {
      dispatch(addGym(result.addedGym))
    })
}

export const editGymAsync = (url, body) => (dispatch) => {
  return fetch(url, {
    method: 'PUT',
    headers: {
     'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((result) => {
      dispatch(editGym(result.editedGym))
    })
}

export default gymReducer.reducer