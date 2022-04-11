import { createSlice } from '@reduxjs/toolkit'

export const commentReducer = createSlice({
  name: 'comments',
  initialState: {
    comments: []
  },
  reducers: {
    setComments: (state, action) => {
      state.comments = action.payload
    },
    addComment: (state, action) => {
      state.comments = [...state.comments, { ...action.payload, id: state.comments.length + 1 }]
    },
    editComment: (state, action) => {
      state.comments = state.comments.map((comment) => comment._id === action.payload._id ? action.payload : comment)
    },
    deleteComment: (state, action) => {
      state.comments = state.comments.filter(comment => comment._id !== action.payload._id)
    }
  },
})

export const { setComments, addComment, editComment, deleteComment } = commentReducer.actions

export const setCommentsAsync = (url) => (dispatch) => {
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then((response) => response.json())
    .then((result) => {
      dispatch(setComments(result.data))
    })
  }

export const addCommentAsync = (url, body) => (dispatch) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((result) => {
      dispatch(addComment(result.addedComment))
    })
}

export const editCommentAsync = (url, body) => (dispatch) => {
  return fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((result) => {
      dispatch(editComment(result.editedComment))
    })
}

export const deleteCommentAsync = (url) => (dispatch) => {
  return fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then((response) => response.json())
    .then((result) => {
      dispatch(deleteComment(result.data))
    })
}

export default commentReducer.reducer