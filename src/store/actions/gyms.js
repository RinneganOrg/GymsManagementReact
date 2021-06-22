export function setGyms(gyms) {
  return {
    type: 'SET_GYMS',
    gyms
  }
}

export function addGym(gym) {
  return {
    type: 'ADD_GYM',
    gym
  }
}

export function editGym(gym) {
  return {
    type: 'EDIT_GYM',
    gym
  }
}