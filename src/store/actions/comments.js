export function setComments() {
  return (dispatch) => {
    return fetch("http://localhost:8000/comments", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => response.json())
      .then((result) => {
        dispatch({ type: "SET_COMMENTS", comments: result.data })
      })
  }
}

export function addComment(body) {
  return (dispatch) => {
    return fetch("http://localhost:8000/comments", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((result) => {
        dispatch({ type: "ADD_COMMENT", comment: result.addedComment })
      })
  }
}

export function editComment(url, body) {
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
        dispatch({ type: "EDIT_COMMENT", comment: result.editedComment })
      })
  }
}

export function deleteComment(url) {
  return (dispatch) => {
    return fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        dispatch({ type: "DELETE_COMMENT", comment: result.data })
      })
  }
}