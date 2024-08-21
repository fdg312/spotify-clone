import { Models } from 'appwrite'
import { LoaderFunctionArgs } from 'react-router-dom'
import {
	COLLECTIONID_PLAYLISTS,
	DATABASEID,
	databases,
} from '../../lib/appwrite'

export const playlistLoader = async ({
	params,
}: LoaderFunctionArgs<{ playlistId: string }>): Promise<Models.Document> => {
	const { playlistId } = params

	if (!playlistId) {
		throw new Error('Album ID is missing')
	}

	const document = await databases.getDocument(
		DATABASEID,
		COLLECTIONID_PLAYLISTS,
		playlistId
	)
	console.log(document)

	return document
}
