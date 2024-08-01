import { Models } from 'appwrite'
import { useColor } from 'color-thief-react'
import { useState } from 'react'
import {
	Link,
	LoaderFunctionArgs,
	useLoaderData,
	useNavigation,
} from 'react-router-dom'
import { ClockIcon } from '../../assets/icons/ClockIcon'
import { DotsIcon } from '../../assets/icons/DotsIcon'
import SongList, { SongListProps } from '../../components/songList/SongList'
import { PlayButton } from '../../components/ui/button/playButton/PlayButton'
import { databases } from '../../lib/appwrite'
import { IAlbum } from '../../types/Album'
import { ISong } from '../../types/Song'
import styles from './album.module.css'

export const Album = () => {
	const album = useLoaderData() as IAlbum
	const { data } = useColor(album.imgSrc, 'rgbArray', {
		crossOrigin: 'quality',
	})
	const navigation = useNavigation()
	console.log(navigation.state)

	const [songs] = useState<SongListProps[]>(
		album.tracks.map((song: ISong) => ({
			title: song.title,
			author: song.author.name,
			duration: song.duration,
			srcImg: song.url,
			id: song.id,
			path: song.path,
		}))
	)
	console.log(data)
	console.log(
		`linear-gradient(to bottom, rgb(${data?.[0]}, ${data?.[1]}, ${data?.[2]}, #fff))`
	)

	return (
		<div className={styles.wrapper}>
			<div
				style={{
					background: `linear-gradient(to bottom, rgb(${data?.[0]}, ${data?.[1]}, ${data?.[2]}), rgba(${data?.[0]}, ${data?.[1]}, ${data?.[2]}, 0.55))`,
				}}
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
			<div
				style={{
					background: `linear-gradient(to bottom, rgba(${data?.[0]}, ${data?.[1]}, ${data?.[2]}, 0.55), rgba(${data?.[0]}, ${data?.[1]}, ${data?.[2]}, 0.1)) 0% 0% / 100% 60% no-repeat`,
				}}
				className={styles.downer}
			>
				<div className={styles.buttons}>
					<PlayButton color='green' />
					<div className={styles.dots}>
						<DotsIcon />
					</div>
				</div>
				<div className={styles.layout}>
					<div className={styles.leftlayout}>
						<span className={styles.id}>#</span>
						<span className={styles.leftlayout}>Title</span>
					</div>
					<div className={styles.rightlayout}>
						<ClockIcon />
					</div>
				</div>
				<SongList songs={songs} />
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
