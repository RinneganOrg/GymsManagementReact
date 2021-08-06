export function setTrainers(url) {
  return (dispatch) => {
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((result) => {
        dispatch({ type: "SET_TRAINERS", trainers: result.data })
      })
  }
}

export function setTrainer(url) {
  return (dispatch) => {
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((result) => {
        dispatch({ type: "SET_TRAINER", trainer: result.data })
      })
  }
}

export function addTrainer(url, body) {
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
        dispatch({ type: "ADD_TRAINER", trainer: result.addedTrainer })
      })
  }
}

export function editTrainer(url, body) {
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
        dispatch({ type: "EDIT_TRAINER", trainer: result.editedTrainer })
      })
  }
}