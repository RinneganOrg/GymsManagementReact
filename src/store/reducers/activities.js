const initialState = {
  activities: [
    {
      id: 1,
      gymId: 1,
      courseId: 1,
      attendance: 10,
      startDate: "2021-01-01",
      endDate: "2021-01-05"
    },
    {
      id: 2,
      gymId: 1,
      courseId: 1,
      attendance: 20,
      startDate: "2021-01-07",
      endDate: "2021-01-12"
    },
    {
      id: 3,
      gymId: 1,
      courseId: 1,
      attendance: 15,
      startDate: "2021-01-20",
      endDate: "2021-01-25"
    },
    {
      id: 4,
      gymId: 2,
      courseId: 2,
      attendance: 10,
      startDate: "2021-01-02",
      endDate: "2021-01-15"
    },
    {
      id: 5,
      gymId: 2,
      courseId: 2,
      attendance: 20,
      startDate: "2021-01-06",
      endDate: "2021-01-13"
    },{
      id: 6,
      gymId: 2,
      courseId: 3,
      attendance: 15,
      startDate: "2021-01-14",
      endDate: "2021-01-17"
    },{
      id: 7,
      gymId: 2,
      courseId: 3,
      attendance: 12,
      startDate: "2021-01-18",
      endDate: "2021-01-25"
    },{
      id: 8,
      gymId: 2,
      courseId: 3,
      attendance: 7,
      startDate: "2021-04-14",
      endDate: "2021-04-17"
    },{
      id: 9,
      gymId: 2,
      courseId: 2,
      attendance: 10,
      startDate: "2021-05-18",
      endDate: "2021-05-25"
    }
  ]
}

export default function addActivity(state = initialState, action) {
  switch (action.type) {
    case 'ADD_ACTIVITY':
      return { ...state, activities: [...state.activities, { ...action.activity, id: state.activities.length + 1 }] }
    case 'SET_ACTIVITIES':
      return { ...state, activities: action.activities }
    default:
      return state
  }
}