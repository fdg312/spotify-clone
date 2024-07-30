import { Models } from 'appwrite'
import { useColor } from 'color-thief-react'
import { Link, LoaderFunctionArgs, useLoaderData } from 'react-router-dom'
import SongList from '../../components/songList/SongList'
import { databases } from '../../lib/appwrite'
import styles from './album.module.css'

export const Album = () => {
	const album = useLoaderData() as Models.Document
	const { data } = useColor(album.imgSrc, 'hex', { crossOrigin: 'quality' })
	console.log(typeof album.tracks)

	return (
		<div className={styles.wrapper}>
			<div
				style={{ background: `linear-gradient(to bottom, ${data}, #56391c)` }}
				className={styles.upper}
			>
				<div className={styles.img}>
					<img src={album.imgSrc} alt={album.title} />
				</div>
				<div className={styles.info}>
					<span className={styles.type}>Album</span>
					<h1 className={styles.title}>{album.title}</h1>
					<div className={styles.data}>
						<Link to='#' className={styles.author}>
							{album.author.name}
						</Link>
						<span className={styles.divider}>•</span>
						<span className={styles.year}>
							{new Date(album.date).getFullYear()}
						</span>
						<span className={styles.divider}>•</span>
						<span className={styles.quantity}>{album.tracks.length} songs</span>
					</div>
				</div>
			</div>
			<div className='downer'>
				<SongList songs={album.tracks} />
			</div>
		</div>
	)
}

export const albumLoader = async ({
	params,
}: LoaderFunctionArgs<{ albumId: string }>): Promise<Models.Document> => {
	const { albumId } = params

	if (!albumId) {
		throw new Error('Album ID is missing')
	}

	const document = await databases.getDocument(
		import.meta.env.VITE_APPWRITE_DATABASEID,
		import.meta.env.VITE_APPWRITE_COLLECTIONID_ALBUMS,
		albumId
	)

	return document
}
