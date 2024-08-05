import { createAsyncThunk } from '@reduxjs/toolkit'
import { ID, Permission, Role } from 'appwrite'
import {
	account,
	COLLECTIONID_ACCOUNTS,
	DATABASEID,
	databases,
} from '../../lib/appwrite'
import { getRandomColor } from '../../utils/getRandomColor'

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
			const newUser = await account.get()
			console.log(newUser)
			console.log(await account.getSession('current'))

			await databases.createDocument(
				DATABASEID,
				COLLECTIONID_ACCOUNTS,
				ID.unique(),
				{
					userId: newUser.$id,
					avatarColor: getRandomColor(),
				},
				[
					Permission.read(Role.user(newUser.$id)),
					Permission.update(Role.user(newUser.$id)),
					Permission.delete(Role.user(newUser.$id)),
				]
			)

			return newUser
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
			return await account.get()
		} catch (error) {
			return rejectWithValue(error)
		}
	}
)

export const getCurrent = createAsyncThunk(
	'auth/getCurrent',
	async (_, { rejectWithValue }) => {
		try {
			return await account.get()
		} catch (error) {
			return rejectWithValue(error)
		}
	}
)
