const initialState = {
  isToolbarReady: false
}

export default function toolbarIsReady(state = initialState, action) {
  switch (action.type) {
    case 'TOOLBAR_IS_READY':
      return { ...state, isToolbarReady: true}
    default:
      return state
  }
}