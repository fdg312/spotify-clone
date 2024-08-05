import { createSlice } from '@reduxjs/toolkit'
import { Models } from 'appwrite'
import { checkAuth, login, register } from './authActions'

export interface AuthState {
	user: Models.User<Models.Preferences> | null
	loading: boolean
	error: string | null
}

const initialState: AuthState = {
	user: null,
	loading: false,
	error: null,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(register.pending, state => {
				state.loading = true
			})
			.addCase(register.fulfilled, (state, action) => {
				state.user = action.payload
				state.loading = false
			})
			.addCase(register.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload as string
			})
			.addCase(login.pending, state => {
				state.loading = true
			})
			.addCase(login.fulfilled, (state, action) => {
				state.user = action.payload
				state.loading = false
			})
			.addCase(login.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload as string
			})
			.addCase(checkAuth.pending, state => {
				state.loading = true
			})
			.addCase(checkAuth.fulfilled, (state, action) => {
				state.user = action.payload
				state.loading = false
			})
			.addCase(checkAuth.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload as string
			})
	},
})

export default authSlice.reducer
