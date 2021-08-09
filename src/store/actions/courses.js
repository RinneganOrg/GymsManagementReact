export function setCourses(url) {
  return (dispatch) => {
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => response.json())
      .then((result) => {
        dispatch({ type: "SET_COURSES", courses: result.data })
      })
  }
}

export function setCourse(url) {
  return (dispatch) => {
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => response.json())
      .then((result) => {
        dispatch({ type: "SET_COURSE", course: result.data })
      })
  }
}

export function addCourse(url, body) {
  return (dispatch) => {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((result) => {
        dispatch({ type: "ADD_COURSE", course: result.addedCourse })
      })
  }
}

export function editCourse(url, body) {
  return (dispatch) => {
    return fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((result) => {
        dispatch({ type: "EDIT_COURSE", course: result.editedCourse })
      })
  }
}