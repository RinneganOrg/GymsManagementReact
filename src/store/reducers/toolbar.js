//     case 'TOOLBAR_IS_READY':
//       return { ...state, isToolbarReady: true}
//     default:
//       return state
//   }
// }

import { createSlice } from '@reduxjs/toolkit'

export const toolbarReducer = createSlice({
  name: 'toolbar',
  initialState: {
    isToolbarReady: false
  },
  reducers: {
    toolbarIsReady: (state) => {
      state.isToolbarReady = true
    }
  },
})

export const { toolbarIsReady } = toolbarReducer.actions

export default toolbarReducer.reducer