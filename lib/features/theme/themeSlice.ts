import { createSlice } from '@reduxjs/toolkit'
import { defaultLightTheme} from 'react-admin'



const initialState= {
  value:defaultLightTheme,
}


export const themeSlice = createSlice({
  name: 'theme',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setTheme: (state,action) => {
      state.value = action.payload
    },
  }
})

export const { setTheme } = themeSlice.actions

// Other code such as selectors can use the imported `RootState` type

export default themeSlice.reducer