// import { ActionFunctionArgs } from 'react-router-dom'
// import {
// 	COLLECTIONID_PLAYLISTS,
// 	DATABASEID,
// 	databases,
// } from '../../lib/appwrite'

// export const albumAction = async ({
// 	request,
// 	params,
// }: ActionFunctionArgs) => {
// 	const { albumId } = params

// 	if (!albumId) throw new Error('Playlist ID is missing')

// 	const formData = await request.formData()
// 	const trackId = formData.get('trackId') as string
// 	const trackIds = formData.get('trackIds') as string
// 	const playlistId = formData.get('playlistId') as string

// 	const newTracks = trackIds.split(',').filter(id => id !== trackId)

// 	const response = await databases.updateDocument(
// 		DATABASEID,
// 		COLLECTIONID_PLAYLISTS,
// 		playlistId,
// 		{
// 				tracks: newTracks,
// 			}
// 		)

// 		if (!response) {
// 			throw new Error('Failed to update playlist')
// 		}
// 		console.log(response, 'response')

// 		return response
// 	}
// }
