const initialState = {
  comments: [
    {
      id: 1,
      gymId: 1,
      trainerId: 1,
      userId: 1,
      courseId: 1,
      comment: "Great Chilly",
      rating: 3
    },
    {
      id: 2,
      gymId: 1,
      trainerId: 1,
      userId: 2,
      courseId: 1,
      comment: "Amazing Chilly at WorldClass",
      rating: 4
    },
    {
      id: 3,
      gymId: 2,
      trainerId: 2,
      userId: 3,
      courseId: 2,
      comment: "Wonderful Reece at FitClass",
      rating: 5
    }
  ]
}

export default function addComment(state = initialState, action) {
  switch (action.type) {
    case 'ADD_COMMENT':
      return { ...state, comments: [...state.comments, { ...action.comment, id: state.comments.length + 1 }] }
    case 'SET_COMMENTS':
      return { ...state, comments: action.comments }
    case 'EDIT_COMMENT':
      return { ...state, comments: state.comments.map((comment) => comment.id === action.comment.id ? action.comment : comment) }
    case 'DELETE_COMMENT':
      return { ...state, comments: state.comments.filter(comment => comment.id !== action.comment.id) }
    // Case 1 
    // const indexOfComment = state.comments.indexOf( action.comment )
    // return { ...state, comments: [...state.comments.slice(0, indexOfComment), ...state.comments.slice(indexOfComment + 1)]  }
    // Case 2
    // return { ...state, comments: state.comments.filter(comment => comment.id !== action.comment.id)}
    default:
      return state
  }
}