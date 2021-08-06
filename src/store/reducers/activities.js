const initialState = {
  activities: [
    {
      id: 1,
      gymId: 1,
      courseId: 1,
      trainerId: 1,
      maxAttendance: 10,
      currentAttendance: 0,
      startDate: "2021-01-01",
      endDate: "2021-01-05",
      userIds: []
    },
    {
      id: 2,
      gymId: 1,
      courseId: 1,
      trainerId: 1,
      maxAttendance: 20,
      currentAttendance: 0,
      startDate: "2021-01-07",
      endDate: "2021-01-12",
      userIds: []
    },
    {
      id: 3,
      gymId: 1,
      courseId: 1,
      trainerId: 1,
      trainerId: 1,
      maxAttendance: 15,
      currentAttendance: 0,
      startDate: "2021-01-20",
      endDate: "2021-01-25",
      userIds: []
    },
    {
      id: 4,
      gymId: 2,
      courseId: 2,
      trainerId: 1,
      maxAttendance: 10,
      currentAttendance: 0,
      startDate: "2021-01-02",
      endDate: "2021-01-04",
      userIds: []
    },
    {
      id: 5,
      gymId: 2,
      courseId: 2,
      trainerId: 1,
      maxAttendance: 20,
      currentAttendance: 0,
      startDate: "2021-01-06",
      endDate: "2021-01-13",
      userIds: []
    },
    {
      id: 6,
      gymId: 2,
      courseId: 2,
      trainerId: 1,
      maxAttendance: 20,
      currentAttendance: 0,
      startDate: "2021-03-30",
      endDate: "2021-04-01",
      userIds: []
    }, {
      id: 12,
      gymId: 2,
      courseId: 3,
      trainerId: 2,
      maxAttendance: 15,
      currentAttendance: 0,
      startDate: "2021-02-01",
      endDate: "2021-02-03",
      userIds: []
    }, {
      id: 7,
      gymId: 2,
      courseId: 3,
      trainerId: 1,
      maxAttendance: 12,
      currentAttendance: 0,
      startDate: "2021-01-18",
      endDate: "2021-01-25",
      userIds: []
    }, {
      id: 8,
      gymId: 2,
      courseId: 3,
      trainerId: 2,
      maxAttendance: 7,
      currentAttendance: 0,
      startDate: "2021-04-14",
      endDate: "2021-04-17",
      userIds: []
    }, {
      id: 9,
      gymId: 2,
      courseId: 2,
      trainerId: 1,
      maxAttendance: 40,
      currentAttendance: 0,
      startDate: "2021-05-18",
      endDate: "2021-05-25",
      userIds: []
    }, {
      id: 11,
      gymId: 2,
      courseId: 3,
      trainerId: 2,
      maxAttendance: 35,
      currentAttendance: 0,
      startDate: "2021-05-17",
      endDate: "2021-05-25",
      userIds: []
    },
    {
      id: 10,
      gymId: 3,
      courseId: 4,
      trainerId: 2,
      maxAttendance: 45,
      currentAttendance: 0,
      startDate: "2021-05-18",
      endDate: "2021-05-25",
      userIds: []
    }
  ]
}
export default function addActivity(state = initialState, action) {
  switch (action.type) {
    case 'ADD_ACTIVITY':
      return { ...state, activities: [...state.activities, { ...action.activity, id: state.activities.length + 1 }] }
    case 'SET_ACTIVITIES':
      return { ...state, activities: action.activities }
    case 'EDIT_ACTIVITY':
      return { ...state, activities: state.activities.map((activity) => activity._id === action.activity._id ? action.activity : activity) }
    case 'DELETE_ACTIVITY':
      return { ...state, activities: state.activities.filter(activity => activity._id !== action.activity._id) }
    default:
      return state
  }
}