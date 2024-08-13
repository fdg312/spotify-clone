import {
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react'
import { useFetcher } from 'react-router-dom'
import { PauseIcon } from '../../assets/icons/PauseIcon'
import { PlayIcon } from '../../assets/icons/PlayIcon'
import {
	DropdownProps,
	SongItemContext,
	SongItemOwnerContext,
} from '../../constants/dropdown'
import { useAppSelector } from '../../hooks/reduxHooks'
import {
	COLLECTIONID_PLAYLISTS,
	DATABASEID,
	databases,
} from '../../lib/appwrite'
import { AudioContext } from '../../providers/AudioProvider'
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
	playlist,
}: ISong) => {
	const [isHover, setIsHover] = useState(false)
	const fetcher = useFetcher()
	const [isDropdown, setIsDropdown] = useState(false)
	const [isPlaylistsDropdown, setIsPlaylistsDropdown] = useState(false)
	const [dropdownPlaylistsElements, setDropdownPlaylistsElements] = useState<
		DropdownProps['elements']
	>([])
	const dropdownRef = useRef<HTMLDivElement>(null)
	const playlistsDropdownRef = useRef<HTMLDivElement>(null)
	const [pos, setPos] = useState({ x: 0, y: 0 })
	const myPlaylists = useAppSelector(state => state.auth.account?.myPlaylists)
	const user = useAppSelector(state => state.auth.user)
	const { selectAudio, currentSong, pauseAudio, isPlaying } =
		useContext(AudioContext)

	const isOwner = useMemo(
		() => playlist?.accounts?.userId === user?.$id,
		[playlist?.accounts?.userId, user?.$id]
	)

	SongItemContext[0].onMouseEnter = () => setIsPlaylistsDropdown(true)
	SongItemContext[0].onMouseLeave = () => setIsPlaylistsDropdown(false)

	const addSongToPlaylist = useCallback(
		async (playlist: IPlaylist) => {
			const playlistIds = playlist.tracks.map(play => play.$id)

			const newPlaylistTracks = Array.from(
				new Set([...(playlistIds ?? []), trackId])
			)

			await databases.updateDocument(
				DATABASEID,
				COLLECTIONID_PLAYLISTS,
				playlist.$id,
				{
					tracks: newPlaylistTracks,
				}
			)

			setIsDropdown(false)
		},
		[trackId]
	)

	const removeSongFromPlaylist = useCallback(
		async (playlist: IPlaylist) => {
			// let trackIds = playlist.tracks.map(play => play.$id)

			// trackIds = trackIds.filter(id => id !== trackId)

			// await databases.updateDocument(
			// 	DATABASEID,
			// 	COLLECTIONID_PLAYLISTS,
			// 	playlist.$id,
			// 	{
			// 		tracks: trackIds,
			// 	}
			// )

			// setIsDropdown(false)
			console.log(fetcher)

			fetcher.submit({ ads: 'asd' }, { method: 'get', action: '#' })
			console.log(fetcher)
		},
		[trackId]
	)

	useEffect(() => {
		if (isOwner) {
			SongItemOwnerContext[1].onClick = () => removeSongFromPlaylist(playlist)
		}
	}, [])

	const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
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

	useEffect(() => {
		if (myPlaylists) {
			setDropdownPlaylistsElements(
				myPlaylists?.map((play: IPlaylist) => ({
					title: play.title,
					onClick: () => addSongToPlaylist(play),
				}))
			)
		}
	}, [myPlaylists, isPlaylistsDropdown, addSongToPlaylist])

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
					time: 0,
				})
			}
			className={styles.wrapper}
		>
			<div className={styles.main}>
				{isHover && (!isPlaying || currentSong.index !== id) ? (
					<div
						onClick={() =>
							selectAudio({
								title,
								author,
								src: url,
								duration,
								index: id,
								srcImg,
								time: 0,
							})
						}
					>
						<PlayIcon />
					</div>
				) : currentSong.index === id && isPlaying ? (
					currentSong.index === id &&
					isPlaying && (
						<div
							className={
								(currentSong.index === id && styles.active) || undefined
							}
							onClick={() => {
								setIsHover(false)
								pauseAudio()
							}}
						>
							<PauseIcon />
						</div>
					)
				) : (
					<span
						className={
							styles.id + ' ' + (currentSong.index === id && styles.active)
						}
					>
						{id}
					</span>
				)}
				<div className={styles.text}>
					<h3
						className={
							styles.title + ' ' + (currentSong.index === id && styles.active)
						}
					>
						{title}
					</h3>
					<span className={styles.author}>{author}</span>
				</div>
			</div>
			{/* <span className={styles.album}>{album}</span> */}
			<span className={styles.duration}>{secondsToTime(duration)}</span>
			{(isDropdown || isPlaylistsDropdown) && (
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
							elements={isOwner ? SongItemOwnerContext : SongItemContext}
						/>
						{isPlaylistsDropdown && (
							<div
								onMouseEnter={() => setIsPlaylistsDropdown(true)}
								onMouseLeave={() => setIsPlaylistsDropdown(false)}
								className={styles.dropdownPlaylists}
								ref={playlistsDropdownRef}
							>
								<Dropdown elements={dropdownPlaylistsElements} />
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	)
}

export default SongItem
