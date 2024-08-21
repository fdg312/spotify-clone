import { useColor } from 'color-thief-react'
import { useContext, useEffect, useRef, useState } from 'react'
import { Link, useFetcher, useLoaderData } from 'react-router-dom'
import { AddIcon } from '../../assets/icons/AddIcon'
import { ClockIcon } from '../../assets/icons/ClockIcon'
import { CrossIcon } from '../../assets/icons/CrossIcon'
import { DotsIcon } from '../../assets/icons/DotsIcon'
import { TickIcon } from '../../assets/icons/TickIcon'
import SongList from '../../components/songList/SongList'
import { PlayButton } from '../../components/ui/button/playButton/PlayButton'
import { Dropdown } from '../../components/ui/dropdown/Dropdown'
import { albumDropdownElements } from '../../constants/dropdown'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import {
	COLLECTIONID_ACCOUNTS,
	DATABASEID,
	databases,
} from '../../lib/appwrite'
import { useAudio } from '../../providers/AudioProvider'
import { AuthAlertContext } from '../../providers/AuthAlertProvider'
import { getCurrent } from '../../store/auth/authActions'
import { IPlaylist } from '../../types/Playlist'
import styles from './playlist.module.css'

const Playlist = () => {
	const playlist = useLoaderData() as IPlaylist
	// const [playlist, setPlaylist] = useState(useLoaderData() as IPlaylist)
	const fetcher = useFetcher<IPlaylist>({ key: 'getPlaylist' })
	const [isFavourite, setIsFavourite] = useState(false)
	const { setAlert } = useContext(AuthAlertContext)
	const {
		currentSong,
		isPlaying,
		playAudio,
		songList,
		selectAudio,
		pauseAudio,
	} = useAudio()
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
	const dispatch = useAppDispatch()
	const [isModal, setIsModal] = useState(false)

	const handleClickFavourite = async () => {
		if ((user === null && account === null) || loading) return setAlert(true)
		if (!account) return

		const isAlreadyFavourite = isFavourite && account.favouriteAlbums?.length

		const newFavouriteAlbums = isAlreadyFavourite
			? (account.favouriteAlbums ?? []).filter(alb => alb.$id !== playlist.$id)
			: [...(account.favouriteAlbums ?? []), playlist]
		await databases.updateDocument(
			DATABASEID,
			COLLECTIONID_ACCOUNTS,
			account.$id,
			{
				favouriteAlbums: newFavouriteAlbums,
			}
		)

		setIsFavourite(!isFavourite)

		dispatch(getCurrent())
	}

	useEffect(() => {
		const favStatus = !!account?.favouritePlaylists?.find(
			play => play.$id === playlist.$id
		)

		setIsOwner(playlist.accounts.userId === user?.$id)
		setIsFavourite(favStatus)
	}, [
		isPlaying,
		playlist.tracks,
		currentSong.src,
		setIsOwner,
		isOwner,
		user?.$id,
		account?.favouritePlaylists,
		playlist.$id,
	])

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
					<div
						onClick={() => {
							if (currentSong.index) {
								if (isPlaying) {
									return pauseAudio()
								}
								playAudio(currentSong.src)
							} else {
								selectAudio(songList[0])
							}
						}}
					>
						<PlayButton
							playingStatus={
								isPlaying && currentSong.playlistId === playlist.$id
							}
							color='green'
						/>
					</div>
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
				{!!playlist.tracks?.length && (
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
						<SongList playlist={playlist} songs={playlist.tracks} />
					</>
				)}
			</div>
			{isModal && (
				<div className={styles.wrapper_modal}>
					<div ref={modalRef} className={styles.modal}>
						<img draggable={false} src={playlist.imgSrc} alt={playlist.title} />
						<fetcher.Form
							method='patch'
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

export default Playlist
