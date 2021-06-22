const initialState = {
  isToolbarReady: false
}

export default function toolbarIsReady(state = initialState, action) {
  console.log(state)
  switch (action.type) {
    case 'TOOLBAR_IS_READY':
      return { ...state, isToolbarReady: true}
    default:
      return state
  }
}