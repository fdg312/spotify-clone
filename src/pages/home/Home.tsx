import { Models, Query } from 'appwrite'
import { useEffect, useState } from 'react'
import Albums from '../../components/albums/Albums'
import CategoryCard from '../../components/categoryCard/CategoryCard'
import Playlists from '../../components/playlists/Playlists'
import { COLLECTIONID_ALBUMS, DATABASEID, databases } from '../../lib/appwrite'
import styles from './home.module.css'

const Home = () => {
	const playlists = [
		{
			title: 'Top 10 in the world',
			desc: 'This is the best playlist in the world',
			imgSrc:
				'https://i.scdn.co/image/ab67706f000000028b7b685e7ef24f048048ba3e',
		},
	]

	const [albums, setAlbums] = useState<Models.Document[]>([])

	useEffect(() => {
		async function fetchData() {
			const data = await databases.listDocuments(
				DATABASEID,
				COLLECTIONID_ALBUMS,
				[Query.orderDesc('$createdAt')]
			)

			setAlbums(data.documents)
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
