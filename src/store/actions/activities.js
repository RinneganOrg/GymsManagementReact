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