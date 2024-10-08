import { createSlice } from '@reduxjs/toolkit'
import { Models } from 'appwrite'
import { IAccount } from '../../types/Account'
import { getCurrent, login, logout, register } from './authActions'

export interface AuthState {
	user: Models.User<Models.Preferences> | null
	account: IAccount | null
	loading: boolean
	error: string | null
}

const initialState: AuthState = {
	user: null,
	account: null,
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
				state.user = action.payload.user
				state.account = action.payload.account
				state.loading = false
				state.error = null
			})
			.addCase(register.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload as string
			})
			.addCase(login.pending, state => {
				state.loading = true
			})
			.addCase(login.fulfilled, (state, action) => {
				state.user = action.payload.user
				state.account = action.payload.account
				state.loading = false
				state.error = null
			})
			.addCase(login.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload as string
			})
			.addCase(getCurrent.pending, state => {
				state.loading = true
			})
			.addCase(getCurrent.fulfilled, (state, action) => {
				state.user = action.payload.user
				state.account = action.payload.account
				state.loading = false
				state.error = null
			})
			.addCase(getCurrent.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload as string
			})
			.addCase(logout.pending, state => {
				state.loading = true
			})
			.addCase(logout.fulfilled, state => {
				state.user = null
				state.account = null
				state.loading = false
				state.error = null
			})
			.addCase(logout.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload as string
			})
	},
})

export default authSlice.reducer
