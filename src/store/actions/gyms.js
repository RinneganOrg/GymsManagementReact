export function setGyms() {
  return (dispatch) => {
    return fetch("http://localhost:8000/gyms", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer ' + token
      }
    })
      .then((response) => response.json())
      .then((result) => {
        dispatch({ type: "SET_GYMS", gyms: result.data })
        return result.data.lenght
      })
  }
}

export function setGym(url) {
  return (dispatch) => {
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => response.json())
      .then((result) => {
        dispatch({ type: "SET_GYM", gym: result.data })
      })
  }
}
export function addGym(url, body) {
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
        dispatch({ type: "ADD_GYM", gym: result.addedGym })
      })
  }
}

export function editGym(url, body) {
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
        dispatch({ type: "EDIT_GYM", gym: result.editedGym })
      })
  }
}

