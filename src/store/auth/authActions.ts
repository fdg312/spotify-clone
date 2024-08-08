import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppwriteException, ID, Permission, Query, Role } from 'appwrite'
import {
	account,
	COLLECTIONID_ACCOUNTS,
	DATABASEID,
	databases,
} from '../../lib/appwrite'
import { IAccount } from '../../types/Account'
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
			await account.create(ID.unique(), email, password)
			await account.createEmailPasswordSession(email, password)
			const newUser = await account.get()

			const newAccount = await databases.createDocument<IAccount>(
				DATABASEID,
				COLLECTIONID_ACCOUNTS,
				ID.unique(),
				{
					userId: newUser.$id,
					avatarColor: getRandomColor(),
					displayName: username,
				},
				[
					Permission.read(Role.any()),
					Permission.update(Role.user(newUser.$id)),
					Permission.delete(Role.user(newUser.$id)),
				]
			)

			return { account: newAccount, user: newUser }
		} catch (error) {
			if (error instanceof AppwriteException) {
				return rejectWithValue({ message: error.message })
			}
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
			const user = await account.get()
			const foundAccount = await databases.listDocuments(
				DATABASEID,
				COLLECTIONID_ACCOUNTS,
				[Query.equal('userId', user.$id)]
			)

			const currentAccount = foundAccount.documents[0] as IAccount
			return { account: currentAccount, user: user }
		} catch (error) {
			if (error instanceof AppwriteException) {
				return rejectWithValue({ message: error.message })
			}
			return rejectWithValue(error)
		}
	}
)

export const getCurrent = createAsyncThunk(
	'auth/getCurrent',
	async (_, { rejectWithValue }) => {
		try {
			const user = await account.get()
			const foundAccount = await databases.listDocuments(
				DATABASEID,
				COLLECTIONID_ACCOUNTS,
				[Query.equal('userId', user.$id)]
			)

			const currentAccount = foundAccount.documents[0] as IAccount
			return { account: currentAccount, user: user }
		} catch (error) {
			if (error instanceof AppwriteException) {
				return rejectWithValue({ message: error.message })
			}
			return rejectWithValue(error)
		}
	}
)

export const logout = createAsyncThunk(
	'auth/logout',
	async (_, { rejectWithValue }) => {
		try {
			await account.deleteSession('current')
			return
		} catch (error) {
			if (error instanceof AppwriteException) {
				return rejectWithValue({ message: error.message })
			}
			return rejectWithValue(error)
		}
	}
)
