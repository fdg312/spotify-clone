import { Query } from 'appwrite'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Albums from '../../components/albums/Albums'
import Playlists from '../../components/playlists/Playlists'
import {
	COLLECTIONID_ALBUMS,
	COLLECTIONID_PLAYLISTS,
	DATABASEID,
	databases,
} from '../../lib/appwrite'
import { IAlbum } from '../../types/Album'
import { IPlaylist } from '../../types/Playlist'
import styles from './home.module.css'

const Home = () => {
	const [playlists, setPlaylists] = useState<IPlaylist[]>([])
	const [albums, setAlbums] = useState<IAlbum[]>([])
	let [searchParams] = useSearchParams()
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		async function fetchData() {
			const albums_data = await databases.listDocuments<IAlbum>(
				DATABASEID,
				COLLECTIONID_ALBUMS,
				[
					Query.orderDesc('$createdAt'),
					Query.contains('title', searchParams.get('query')?.split(' ') ?? ''),
				]
			)

			const playlists_data = await databases.listDocuments<IPlaylist>(
				DATABASEID,
				COLLECTIONID_PLAYLISTS,
				[
					Query.orderDesc('$createdAt'),
					Query.contains('title', searchParams.get('query')?.split(' ') ?? ''),
				]
			)

			setPlaylists(playlists_data.documents)
			setAlbums(albums_data.documents)
			setLoading(false)
		}

		fetchData()
	}, [searchParams])

	return (
		<div className={styles.wrapper}>
			{loading ? (
				<h2>Loading...</h2>
			) : (
				<Playlists
					title={
						!playlists.length
							? 'Not found playlists'
							: `${searchParams.get('query') ? 'Found' : 'Popular'} playlists`
					}
					playlists={playlists}
				/>
			)}
			{loading ? (
				<h2>Loading...</h2>
			) : (
				<Albums
					title={
						!albums.length
							? 'Not found albums'
							: `${searchParams.get('query') ? 'Found' : 'Popular'} albums`
					}
					albums={albums}
				/>
			)}
		</div>
	)
}

export default Home
