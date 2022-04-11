import { createSlice } from '@reduxjs/toolkit'

export const trainerReducer = createSlice({
  name: 'trainers',
  initialState: {
    trainers: []
  },
  reducers: {
    setTrainers: (state, action) => {
      state.trainers = action.payload
    },
    addTrainer: (state, action) => {
      state.trainers = [...state.trainers, { ...action.payload }] 
    },
    editTrainer: (state, action) => {
      state.trainers = state.trainers.map((trainer) => trainer._id === action.payload._id ? action.payload : trainer) 
    }
  },
})

export const { setTrainers, addTrainer, editTrainer } = trainerReducer.actions

export const setTrainersAsync = (url) => (dispatch) => {
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((result) => {
      dispatch(setTrainers(result.data))
    })
}

export const addTrainerAsync = (url, body) => (dispatch) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((result) => {
      dispatch(addTrainer(result.addedTrainer))
    })
}

export const editTrainerAsync = (url, body) => (dispatch) => {
  return fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((result) => {
      dispatch(editTrainer(result.editedTrainer))
    })
}

export default trainerReducer.reducer