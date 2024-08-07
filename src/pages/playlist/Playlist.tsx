import { Models } from 'appwrite'
import { useColor } from 'color-thief-react'
import { useEffect, useRef, useState } from 'react'
import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom'
import { AddIcon } from '../../assets/icons/AddIcon'
import { ClockIcon } from '../../assets/icons/ClockIcon'
import { DotsIcon } from '../../assets/icons/DotsIcon'
import SongList, { SongListProps } from '../../components/songList/SongList'
import { PlayButton } from '../../components/ui/button/playButton/PlayButton'
import { Dropdown } from '../../components/ui/dropdown/Dropdown'
import { albumDropdownElements } from '../../constants/dropdown'
import { useAppSelector } from '../../hooks/reduxHooks'
import {
	COLLECTIONID_PLAYLISTS,
	DATABASEID,
	databases,
} from '../../lib/appwrite'
import { useAudio } from '../../providers/AudioProvider'
import { IPlaylist } from '../../types/Playlist'
import { ITrack } from '../../types/Track'
import styles from './playlist.module.css'

const Playlist = () => {
	const playlist = useLoaderData() as IPlaylist
	const { currentSong, isPlaying } = useAudio()
	const [playingStatus, setPlayingStatus] = useState(false)
	const [isOwner, setIsOwner] = useState(false)
	const { user } = useAppSelector(state => state.auth)

	useEffect(() => {
		const status =
			isPlaying &&
			!!playlist.tracks.filter((song: ITrack) => {
				return song.path === currentSong.src
			}).length

		setPlayingStatus(status)
		setIsOwner(playlist.accounts.userId === user?.$id)
	}, [
		isPlaying,
		setPlayingStatus,
		playlist.tracks,
		currentSong.src,
		setIsOwner,
		isOwner,
		playlist.accounts.userId,
		user?.$id,
	])

	const { data } = useColor(playlist.imgSrc, 'rgbArray', {
		crossOrigin: 'quality',
	})
	const [isDropdown, setIsDropwdown] = useState(false)
	const dropdownRef = useRef<HTMLDivElement>(null)

	const [songs] = useState<SongListProps[]>(
		playlist.tracks.map((song: ITrack) => ({
			title: song.title,
			duration: song.duration,
			srcImg: song.album.imgSrc,
			id: song.id,
			path: song.path,
			author: song.author.name,
		}))
	)

	const handleClickOutside = (event: MouseEvent) => {
		if (
			dropdownRef.current &&
			!dropdownRef.current.contains(event.target as Node)
		) {
			setIsDropwdown(false)
		}
	}

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [isDropdown])

	return (
		<div className={styles.wrapper}>
			<div
				style={{
					background: `linear-gradient(to bottom, rgb(${data?.[0]}, ${data?.[1]}, ${data?.[2]}), rgba(${data?.[0]}, ${data?.[1]}, ${data?.[2]}, 0.55))`,
				}}
				className={styles.upper}
			>
				<div className={styles.img}>
					<img src={playlist.imgSrc} alt={playlist.title} />
				</div>
				<div className={styles.info}>
					<span className={styles.type}>Playlist</span>
					<h1
						style={{
							cursor: isOwner ? 'pointer' : 'default',
						}}
						className={styles.title}
					>
						{playlist.title}
					</h1>
					<div className={styles.data}>
						{!!playlist.tracks.length && (
							<span className={styles.quantity}>
								{playlist.tracks.length} songs
							</span>
						)}
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
					<PlayButton playingStatus={playingStatus} color='green' />
					<div className={styles.add}>
						<AddIcon />
					</div>
					<div
						onClick={() => setIsDropwdown(!isDropdown)}
						className={styles.dots}
					>
						<DotsIcon />
						<div className={styles.dropdown} ref={dropdownRef}>
							<Dropdown isShow={isDropdown} elements={albumDropdownElements} />
						</div>
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
			<div className={styles.modal}></div>
		</div>
	)
}

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

	return document
}

export default Playlist
