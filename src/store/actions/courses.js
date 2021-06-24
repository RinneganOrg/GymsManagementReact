export function setCourses(courses) {
  return {
    type: 'SET_COURSES',
    courses
  }
}

export function addCourse(course) {
  return {
    type: 'ADD_COURSE',
    course
  }
}

export function editCourse(course) {
  return {
    type: 'EDIT_COURSE',
    course
  }
}