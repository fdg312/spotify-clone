import { Query } from 'appwrite'
import { useEffect, useState } from 'react'
import Albums from '../../components/albums/Albums'
import CategoryCard from '../../components/categoryCard/CategoryCard'
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
	// const playlists = [
	// 	{
	// 		title: 'Top 10 in the world',
	// 		desc: 'This is the best playlist in the world',
	// 		imgSrc:
	// 			'https://i.scdn.co/image/ab67706f000000028b7b685e7ef24f048048ba3e',
	// 	},
	// ]
	const [playlists, setPlaylists] = useState<IPlaylist[]>([])
	const [albums, setAlbums] = useState<IAlbum[]>([])

	useEffect(() => {
		async function fetchData() {
			const albums_data = await databases.listDocuments<IAlbum>(
				DATABASEID,
				COLLECTIONID_ALBUMS,
				[Query.orderDesc('$createdAt')]
			)

			const playlists_data = await databases.listDocuments<IPlaylist>(
				DATABASEID,
				COLLECTIONID_PLAYLISTS,
				[Query.orderDesc('$createdAt')]
			)

			setPlaylists(playlists_data.documents)
			setAlbums(albums_data.documents)
		}

		fetchData()
	}, [])

	return (
		<div className={styles.wrapper}>
			<h2 className={styles.title}>Browse all</h2>
			<div className={styles.cards}>
				<CategoryCard
					color='#8C1932'
					src='https://i.scdn.co/image/ab67fb8200005caf3f3de915ef4a9f3eaf242f02'
					title='Pop'
				/>
				<CategoryCard
					color='#8C1932'
					src='https://i.scdn.co/image/ab67fb8200005caf3f3de915ef4a9f3eaf242f02'
					title='Pop'
				/>
				<CategoryCard
					color='#8C1932'
					src='https://i.scdn.co/image/ab67fb8200005caf3f3de915ef4a9f3eaf242f02'
					title='Pop'
				/>
				<CategoryCard
					color='#8C1932'
					src='https://i.scdn.co/image/ab67fb8200005caf3f3de915ef4a9f3eaf242f02'
					title='Pop'
				/>
			</div>
			<Playlists title='Popular playlists' playlists={playlists} />
			<Albums title='Popular albums' albums={albums} />
		</div>
	)
}

export default Home
