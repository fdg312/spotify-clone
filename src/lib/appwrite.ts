import { Account, Client, Databases } from 'appwrite'

export const PROJECTID = '66a2bf4a0017acdf9a67'
export const DATABASE_ID = '66a4e9e4000c97c2e19f'
export const COLLECTION_ID_PLAYLISTS = '66a4ea0c000a0172dda6'
export const COLLECTION_ID_ALBUMS = '66a657c7001e344343b2'
export const COLLECTION_ID_AUTHORS = '66a65aa90000629077ef'
export const COLLECTION_ID_TRACKS = '66a659150018c2e9e6ea'

export const client = new Client()

client.setEndpoint('https://cloud.appwrite.io/v1').setProject(PROJECTID)

export const databases = new Databases(client)
export const account = new Account(client)
