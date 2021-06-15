export function setUsers(users) {
  return { 
    type: 'SET_USERS',
    users
  }
}

export function addUser(user) {
  return { 
    type: 'ADD_USER',
    user
  }
}