import { createSlice } from '@reduxjs/toolkit'

export const activityReducer = createSlice({
  name: 'activities',
  initialState: {
    activities: []
  },
  reducers: {
    setActivities: (state, action) => {
      state.activities = action.payload
    },
    addActivity: (state, action) => {
      state.activities = [...state.activities, { ...action.payload, id: state.activities.length + 1 }]
    },
    editActivity: (state, action) => {
      state.activities = state.activities.map((activity) => activity._id === action.payload._id ? action.payload : activity)
    },
    deleteActivity: (state, action) => {
      state.activities = state.activities.filter(activity => activity._id !== action.payload._id)
    }
  },
})

export const { setActivities, addActivity, editActivity, deleteActivity } = activityReducer.actions

export const setActivitiesAsync = (url) => (dispatch) => {
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then((response) => response.json())
    .then((result) => {
      dispatch(setActivities(result.data))
    })
}

export const addActivityAsync = (url, body) => (dispatch) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((result) => {
      dispatch(addActivity(result.addedActivity))
    })
}

export const editActivityAsync = (url, body) => (dispatch) => {
  return fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((result) => {
      dispatch(editActivity(result.editedActivity))
    })
}

export const deleteActivityAsync = (url) => (dispatch) => {
  return fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then((response) => response.json())
    .then((result) => {
      dispatch(deleteActivity(result.data))
    })
}

export default activityReducer.reducer