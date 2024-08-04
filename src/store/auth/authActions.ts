import { createAsyncThunk } from '@reduxjs/toolkit'
import { ID } from 'appwrite'
import { account } from '../../lib/appwrite'

interface RegisterPayload {
	username: string
	password: string
	email: string
}

export const register = createAsyncThunk(
	'auth/register',
	async (
		{ username, email, password }: RegisterPayload,
		{ rejectWithValue }
	) => {
		try {
			await account.create(ID.unique(), email, password, username)
			await account.createEmailPasswordSession(email, password)
			return account.get()
		} catch (error) {
			return rejectWithValue(error)
		}
	}
)

interface LoginPayload {
	password: string
	email: string
}

export const login = createAsyncThunk(
	'auth/login',
	async ({ email, password }: LoginPayload, { rejectWithValue }) => {
		try {
			await account.createEmailPasswordSession(email, password)
			return account.get()
		} catch (error) {
			return rejectWithValue(error)
		}
	}
)
