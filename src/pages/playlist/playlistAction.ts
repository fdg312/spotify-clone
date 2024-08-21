import { ActionFunctionArgs } from 'react-router-dom'
import {
	COLLECTIONID_PLAYLISTS,
	DATABASEID,
	databases,
} from '../../lib/appwrite'

export const playlistAction = async ({
	request,
	params,
}: ActionFunctionArgs) => {
	const { playlistId } = params

	if (!playlistId) throw new Error('Playlist ID is missing')

	if (request.method === 'PATCH') {
		const formData = await request.formData()
		const title = formData.get('title') as string
		const description = formData.get('desc') as string | undefined

		const updatedPlaylist = { title, description }

		const response = await databases.updateDocument(
			DATABASEID,
			COLLECTIONID_PLAYLISTS,
			playlistId,
			updatedPlaylist
		)

		if (!response) {
			throw new Error('Failed to update playlist')
		}

		return response
	} else if (request.method === 'DELETE') {
		const formData = await request.formData()
		const trackId = formData.get('trackId') as string
		const trackIds = formData.get('trackIds') as string
		const playlistId = formData.get('playlistId') as string
		const accountId = formData.get('accountId') as string

		const newTracks = trackIds.split(',').filter(id => id !== trackId)

		console.log(newTracks, trackIds.split(','), trackId)

		const response = await databases.updateDocument(
			DATABASEID,
			COLLECTIONID_PLAYLISTS,
			playlistId,
			{
				tracks: newTracks,
				accounts: accountId,
			}
		)

		if (!response) {
			throw new Error('Failed to update playlist')
		}

		return response
	}
}
