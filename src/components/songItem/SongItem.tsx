import {
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react'
import { useFetcher, useLocation } from 'react-router-dom'
import { PauseIcon } from '../../assets/icons/PauseIcon'
import { PlayIcon } from '../../assets/icons/PlayIcon'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import {
	COLLECTIONID_PLAYLISTS,
	DATABASEID,
	databases,
} from '../../lib/appwrite'
import { AudioContext } from '../../providers/AudioProvider'
import { getCurrent } from '../../store/auth/authActions'
import { IAlbum } from '../../types/Album'
import { IPlaylist } from '../../types/Playlist'
import { secondsToTime } from '../../utils/secondsToTime'
import { Dropdown } from '../ui/dropdown/Dropdown'
import styles from './songitem.module.css'

interface ISong {
	title: string
	author: string
	duration: number
	url: string
	id: number
	srcImg: string
	trackId: string
	album?: IAlbum
	playlist?: IPlaylist
}

const SongItem = ({
	title,
	author,
	duration,
	url,
	id,
	srcImg,
	trackId,
	album,
	playlist: loaderPlaylist,
}: ISong) => {
	const [isHover, setIsHover] = useState(false)
	const fetcher = useFetcher({ key: 'getPlaylist' })
	const location = useLocation()
	const [playlist, setPlaylist] = useState<IPlaylist | undefined>(
		loaderPlaylist
	)
	const [isDropdown, setIsDropdown] = useState(false)
	const [isPlaylistsDropdown, setIsPlaylistsDropdown] = useState(false)
	const dropdownRef = useRef<HTMLDivElement>(null)
	const [pos, setPos] = useState({ x: 0, y: 0 })
	const myPlaylists = useAppSelector(state => state.auth.account?.myPlaylists)
	const dispatch = useAppDispatch()
	const { user, loading } = useAppSelector(state => state.auth)
	const { selectAudio, currentSong, pauseAudio, isPlaying } =
		useContext(AudioContext)

	const [isThisTrack, setIsThisTrack] = useState(false)

	useEffect(() => {
		if (!fetcher.data?.$id) return

		setPlaylist(fetcher.data)
	}, [fetcher.data])

	useEffect(() => {
		if (!currentSong.title) return

		setIsThisTrack(
			currentSong.trackId === trackId &&
				(currentSong.albumId === album?.$id ||
					currentSong.playlistId === playlist?.$id)
		)
	}, [trackId, currentSong.title])

	const isOwner = useMemo(
		() => playlist?.accounts?.userId === user?.$id,
		[playlist?.accounts?.userId, user?.$id]
	)

	const addSongToPlaylist = useCallback(
		async (play: IPlaylist) => {
			const playlistIds = play.tracks.map(p => p.$id)

			const newPlaylistTracks = Array.from(
				new Set([...(playlistIds ?? []), trackId])
			)

			setIsDropdown(false)

			const response = await databases.updateDocument(
				DATABASEID,
				COLLECTIONID_PLAYLISTS,
				play.$id,
				{
					tracks: newPlaylistTracks,
				}
			)

			setPlaylist(response as IPlaylist)
			dispatch(getCurrent())
		},
		[dispatch, trackId]
	)

	const removeSongFromPlaylist = useCallback(
		async (playlist: IPlaylist | undefined) => {
			const trackIds = playlist?.tracks.map(play => play.$id)

			setIsDropdown(false)

			if (trackIds && playlist?.$id) {
				fetcher.submit(
					{
						trackIds,
						trackId,
						playlistId: playlist?.$id,
						accountId: playlist.accounts.$id,
					},
					{ method: 'delete', action: location.pathname }
				)
			}
		},
		[fetcher, location.pathname, trackId]
	)

	const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
		if (loading) return
		e.preventDefault()
		setIsDropdown(true)

		const screenWidth = window.innerWidth
		const menuWidth = 300

		let x = e.clientX

		if (x + menuWidth > screenWidth) {
			x -= menuWidth
		}

		setPos({ x, y: e.pageY })
	}

	const handleClickOutsideDropdown = (event: MouseEvent) => {
		if (!dropdownRef.current?.contains(event.target as Node)) {
			setIsDropdown(false)
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

	return (
		<div
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
			onContextMenu={handleContextMenu}
			onDoubleClick={() =>
				selectAudio({
					title,
					author,
					src: url,
					duration,
					index: id,
					srcImg,
					trackId,
					playlistId: playlist?.$id ? loaderPlaylist?.$id : '',
					albumId: album?.$id ? album.$id : '',
					time: 0,
				})
			}
			className={styles.wrapper}
		>
			<div className={styles.main}>
				{isHover && (!isPlaying || !isThisTrack) ? (
					<div
						onClick={() =>
							selectAudio({
								title,
								author,
								src: url,
								duration,
								index: id,
								srcImg,
								trackId,
								playlistId: playlist?.$id ? loaderPlaylist?.$id : '',
								albumId: album?.$id ? album.$id : '',
								time: 0,
							})
						}
					>
						<PlayIcon />
					</div>
				) : isThisTrack && isPlaying ? (
					<div
						className={isThisTrack ? styles.active : undefined}
						onClick={() => {
							setIsHover(false)
							pauseAudio()
						}}
					>
						<PauseIcon />
					</div>
				) : (
					<span className={`${styles.id} ${isThisTrack ? styles.active : ''}`}>
						{id}
					</span>
				)}
				<div className={styles.text}>
					<h3 className={`${styles.title} ${isThisTrack ? styles.active : ''}`}>
						{title}
					</h3>
					<span className={styles.author}>{author}</span>
				</div>
			</div>
			{/* <span className={styles.album}>{album}</span> */}
			<span className={styles.duration}>{secondsToTime(duration)}</span>
			{isDropdown && (
				<div
					ref={dropdownRef}
					style={{
						top: pos.y,
						left: pos.x,
					}}
					className={styles.dropdowns + ' ' + styles.hover}
				>
					<div className={styles.dropdown}>
						<Dropdown
							elements={[
								{
									title: 'Add to playlist',
									arrowIcon: true,
									onMouseEnter: () => setIsPlaylistsDropdown(true),
									onMouseLeave: () => setIsPlaylistsDropdown(false),
								},
								isOwner
									? {
											title: 'Remove from this playlist',
											onClick: () => removeSongFromPlaylist(playlist),
											// eslint-disable-next-line no-mixed-spaces-and-tabs
									  }
									: null,
							].filter(Boolean)}
						/>
						{isPlaylistsDropdown && myPlaylists && (
							<div
								onMouseEnter={() => setIsPlaylistsDropdown(true)}
								onMouseLeave={() => setIsPlaylistsDropdown(false)}
								className={styles.dropdownPlaylists}
							>
								<Dropdown
									elements={myPlaylists?.map((play: IPlaylist) => ({
										title: play.title,
										onClick: () => addSongToPlaylist(play),
									}))}
								/>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	)
}

export default SongItem
