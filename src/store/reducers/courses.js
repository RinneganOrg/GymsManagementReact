//     case 'ADD_COURSE':
//       return { ...state, courses: [...state.courses, { ...action.course }] }
//     case 'EDIT_COURSE':
//       return { ...state, courses: state.courses.map((course) => course._id === action.course._id ? action.course : course)}
//     default:
//       return state
//   }
// }
import { createSlice } from '@reduxjs/toolkit'

export const courseReducer = createSlice({
  name: 'courses',
  initialState: {
    courses: []
  },
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload
    },
    addCourse: (state, action) => {
      state.courses = [...state.courses, { ...action.payload }]
    },
    editCourse: (state, action) => {
      state.courses = state.courses.map((course) => course._id === action.payload._id ? action.payload : course)
    }
  },
})

export const { setCourses, addCourse, editCourse } = courseReducer.actions

export const setCoursesAsync = (url) => (dispatch) => {
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then((response) => response.json())
    .then((result) => {
      dispatch(setCourses(result.data))
    })
}

export const addCourseAsync = (url, body) => (dispatch) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((result) => {
      dispatch(addCourse(result.addedCourse))
    })
}

export const editCourseAsync = (url, body) => (dispatch) => {
 return fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((result) => {
      dispatch(editCourse(result.editedCourse))
    })
}

export default courseReducer.reducer