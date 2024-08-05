import { Account, Client, Databases } from 'appwrite'

export const PROJECTID = import.meta.env.VITE_APPWRITE_PROJECTID
export const DATABASEID = import.meta.env.VITE_APPWRITE_DATABASEID
export const COLLECTIONID_PLAYLISTS = import.meta.env
	.VITE_APPWRITE_COLLECTIONID_PLAYLISTS
export const COLLECTIONID_ALBUMS = import.meta.env
	.VITE_APPWRITE_COLLECTIONID_ALBUMS
export const COLLECTIONID_AUTHORS = import.meta.env
	.VITE_APPWRITE_COLLECTIONID_AUTHORS
export const COLLECTIONID_TRACKS = import.meta.env
	.VITE_APPWRITE_COLLECTIONID_TRACKS
export const COLLECTIONID_ACCOUNTS = import.meta.env
	.VITE_APPWRITE_COLLECTIONID_ACCOUNTS

export const client = new Client()

client.setEndpoint('https://cloud.appwrite.io/v1').setProject(PROJECTID)

export const databases = new Databases(client)
export const account = new Account(client)

export default client
