export function setActivities() {
  return (dispatch) => {
    return fetch("http://localhost:8000/activities", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => response.json())
      .then((result) => {
        dispatch({ type: "SET_ACTIVITIES", activities: result.data })
      })
  }
}

export function addActivity(url, headers, body) {
  return (dispatch) => {
    return fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((result) => {
        dispatch({ type: "ADD_ACTIVITY", activity: result.addedActivity })
      })
  }
}

export function editActivity(url, headers, body) {
  return (dispatch) => {
    return fetch(url, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((result) => {
        dispatch({ type: "EDIT_ACTIVITY", activity: result.editedActivity })
      })
  }
}

export function deleteActivity(url, headers) {
  return (dispatch) => {
    return fetch(url, {
      method: 'DELETE',
      headers
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        dispatch({ type: "DELETE_ACTIVITY", activity: result.data })
      })
  }
}