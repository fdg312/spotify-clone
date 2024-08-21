import { Models } from 'appwrite'
import { COLLECTIONID_ALBUMS, DATABASEID, databases } from '../../lib/appwrite'
import { LoaderFunctionArgs } from 'react-router-dom'

export const albumLoader = async ({
	params,
}: LoaderFunctionArgs<{ albumId: string }>): Promise<Models.Document> => {
	const { albumId } = params

	if (!albumId) {
		throw new Error('Album ID is missing')
	}

	const document = await databases.getDocument(
		DATABASEID,
		COLLECTIONID_ALBUMS,
		albumId
	)

	return document
}
