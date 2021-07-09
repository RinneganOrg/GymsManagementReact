export function setActivities(activities) {
  return {
    type: 'SET_ACTIVITIES',
    activities
  }
}

export function addActivity(activity) {
  return {
    type: 'ADD_ACTIVITY',
    activity
  }
}

export function editActivity(activity) {
  return {
    type: 'EDIT_ACTIVITY',
    activity
  }
}

export function deleteActivity(activity) {
  return {
    type: 'DELETE_ACTIVITY',
    activity
  }
}