import { Models } from 'appwrite'
import { useColor } from 'color-thief-react'
import { useContext, useEffect, useRef, useState } from 'react'
import {
	ActionFunctionArgs,
	Link,
	LoaderFunctionArgs,
	useFetcher,
	useLoaderData,
} from 'react-router-dom'
import { AddIcon } from '../../assets/icons/AddIcon'
import { ClockIcon } from '../../assets/icons/ClockIcon'
import { CrossIcon } from '../../assets/icons/CrossIcon'
import { DotsIcon } from '../../assets/icons/DotsIcon'
import { TickIcon } from '../../assets/icons/TickIcon'
import SongList, { SongListProps } from '../../components/songList/SongList'
import { PlayButton } from '../../components/ui/button/playButton/PlayButton'
import { Dropdown } from '../../components/ui/dropdown/Dropdown'
import { albumDropdownElements } from '../../constants/dropdown'
import { useAppSelector } from '../../hooks/reduxHooks'
import {
	COLLECTIONID_ACCOUNTS,
	COLLECTIONID_PLAYLISTS,
	DATABASEID,
	databases,
} from '../../lib/appwrite'
import { useAudio } from '../../providers/AudioProvider'
import { AuthAlertContext } from '../../providers/AuthAlertProvider'
import { IPlaylist } from '../../types/Playlist'
import { ITrack } from '../../types/Track'
import styles from './playlist.module.css'

const Playlist = () => {
	const playlist = useLoaderData() as IPlaylist
	const fetcher = useFetcher()
	const [isFavourite, setIsFavourite] = useState(false)
	const { setAlert } = useContext(AuthAlertContext)
	const { currentSong, isPlaying } = useAudio()
	const [playingStatus, setPlayingStatus] = useState(false)
	const [isOwner, setIsOwner] = useState(false)
	const { user, account, loading } = useAppSelector(state => state.auth)
	const { data } = useColor(playlist.imgSrc, 'rgbArray', {
		crossOrigin: 'quality',
	})
	const [isDropdown, setIsDropwdown] = useState(false)
	const dropdownRef = useRef<HTMLDivElement>(null)
	const dotsIconRef = useRef<HTMLDivElement>(null)
	const modalFormRef = useRef<HTMLFormElement>(null)
	const modalRef = useRef<HTMLDivElement>(null)
	const closeRef = useRef<HTMLDivElement>(null)
	const [songs, setSongs] = useState<SongListProps[]>()
	const [isModal, setIsModal] = useState(false)

	const handleClickFavourite = async () => {
		if ((user === null && account === null) || loading) return setAlert(true)
		if (!account) return
		if (isFavourite) {
			let newArrayFavourites = account?.favouritePlaylists?.filter(
				play => play.$id !== playlist.$id
			)

			newArrayFavourites = newArrayFavourites?.map(play => play.id)

			await databases.updateDocument(
				DATABASEID,
				COLLECTIONID_ACCOUNTS,
				account.$id,
				{
					favouritePlaylists: newArrayFavourites,
				}
			)
			setIsFavourite(false)
		} else {
			const newFavourites = [...(account?.favouriteAlbums ?? []), playlist]

			await databases.updateDocument(
				DATABASEID,
				COLLECTIONID_ACCOUNTS,
				account.$id,
				{
					favouritePlaylists: newFavourites,
				}
			)
			setIsFavourite(true)
		}
	}

	useEffect(() => {
		const status =
			isPlaying &&
			!!playlist.tracks.filter((song: ITrack) => {
				return song.path === currentSong.src
			}).length

		const favStatus = !!account?.favouritePlaylists?.find(
			play => play.$id === playlist.$id
		)

		setPlayingStatus(status)
		setIsOwner(playlist.accounts.userId === user?.$id)
		setIsFavourite(favStatus)
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

	useEffect(() => {
		setSongs(
			playlist.tracks.map((song: ITrack) => ({
				title: song.title,
				duration: song.duration,
				srcImg: song.album.imgSrc,
				id: song.id,
				path: song.path,
				author: song.author.name,
				album: song.album.title,
			}))
		)
	}, [])

	const handleClickOutsideDropdown = (event: MouseEvent) => {
		if (
			!dropdownRef.current?.contains(event.target as Node) &&
			!dotsIconRef.current?.contains(event.target as Node)
		) {
			setIsDropwdown(false)
		}
	}

	useEffect(() => {
		if (isDropdown) {
			document.addEventListener('mousedown', handleClickOutsideDropdown)
			return () => {
				document.removeEventListener('mousedown', handleClickOutsideDropdown)
			}
		}
	}, [isDropdown])

	const handleClickOutsideModal = (event: MouseEvent) => {
		if (
			!modalRef.current?.contains(event.target as Node) &&
			!closeRef.current?.contains(event.target as Node)
		) {
			setIsModal(false)
		}
	}

	useEffect(() => {
		if (isModal) {
			document.addEventListener('mousedown', handleClickOutsideModal)
			return () => {
				document.removeEventListener('mousedown', handleClickOutsideModal)
			}
		}
	}, [isModal])

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
						onClick={() => setIsModal(true)}
						className={styles.title}
					>
						{playlist.title}
					</h1>
					<div className={styles.data}>
						<Link className={styles.author} to='#'>
							{playlist.accounts.displayName}
						</Link>

						{!!playlist.tracks.length && (
							<>
								<span className={styles.divider}>•</span>
								<span className={styles.quantity}>
									{playlist.tracks.length} songs
								</span>
							</>
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
					{!isOwner && (
						<div onClick={handleClickFavourite} className={styles.add}>
							{!isFavourite ? <AddIcon /> : <TickIcon />}
						</div>
					)}
					<div className={styles.dots}>
						<div
							onClick={() => setIsDropwdown(!isDropdown)}
							ref={dotsIconRef}
							className={styles.dots_icon}
						>
							<DotsIcon />
						</div>
						<div className={styles.dropdown} ref={dropdownRef}>
							{isDropdown && <Dropdown elements={albumDropdownElements} />}
						</div>
					</div>
				</div>
				{!!songs?.length && (
					<>
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
					</>
				)}
			</div>
			{isModal && (
				<div className={styles.wrapper_modal}>
					<div ref={modalRef} className={styles.modal}>
						<img draggable={false} src={playlist.imgSrc} alt={playlist.title} />
						<fetcher.Form
							method='post'
							ref={modalFormRef}
							onTransitionEnd={() => console.log(123)}
						>
							<input
								placeholder='Title of playlist'
								type='text'
								className='input'
								defaultValue={playlist.title}
								name='title'
								required
							/>
							<textarea
								placeholder='Add description (optional)'
								name='desc'
								id='desc'
							></textarea>
							<button type='submit'>Save</button>
							<div
								ref={closeRef}
								onClick={() => setIsModal(false)}
								className={styles.close}
							>
								<CrossIcon />
							</div>
						</fetcher.Form>
					</div>
				</div>
			)}
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

export const playlistAction = async ({
	request,
	params,
}: ActionFunctionArgs) => {
	const { playlistId } = params

	if (!playlistId) throw new Error('Playlist ID is missing')

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
}

export default Playlist
