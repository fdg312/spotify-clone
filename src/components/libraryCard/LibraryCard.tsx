import { Link, useNavigate } from 'react-router-dom'
import { NoteIcon } from '../../assets/icons/NoteIcon'
import { useAppSelector } from '../../hooks/reduxHooks'
import { useAudio } from '../../providers/AudioProvider'
import { IAccount } from '../../types/Account'
import { IAlbum } from '../../types/Album'
import { IAuthor } from '../../types/Author'
import { IPlaylist } from '../../types/Playlist'
import { ITrack } from '../../types/Track'
import { PlayButton } from '../ui/button/playButton/PlayButton'
import styles from './librarycard.module.css'

export const LibraryCard = ({
	src,
	title,
	author,
	account: accountProp,
	id,
}: {
	src?: string
	title: string
	author?: IAuthor
	account?: IAccount
	id: string
}) => {
	const navigate = useNavigate()
	const { account } = useAppSelector(state => state.auth)
	const {
		isPlaying,
		currentSong,
		pauseAudio,
		selectAudio,
		songList,
		playAudio,
		setSongList,
	} = useAudio()

	// const handleChangeSongList = () => {

	// }

	return (
		<Link
			// style={{ textDecoration: 'none', color: 'inherit' }}
			className={styles.card}
			to={!author?.$id ? `/playlist/${id}` : `/album/${id}`}
		>
			{src ? (
				<img src={src} alt={title} />
			) : (
				<div className={styles.img_not_songs}>
					<NoteIcon />
				</div>
			)}

			<div className={styles.text}>
				<p className={styles.title}>{title}</p>
				<div className={styles.info}>
					<span className={styles.type}>
						{author?.$id ? 'Album' : 'Playlist'}
					</span>
					<span className={styles.divider}>•</span>
					<button
						onClick={e => {
							e.stopPropagation()
							navigate('#')
						}}
						className={styles.author}
					>
						{author?.$id ? author.name : accountProp?.displayName}
					</button>
				</div>
			</div>
			<div
				onClick={e => {
					e.preventDefault()
					if (currentSong.index) {
						if (
							isPlaying &&
							(currentSong.albumId === id || currentSong.playlistId === id)
						) {
							return pauseAudio()
						} else {
							setSongList(
								[
									...(account?.favouriteAlbums ?? []),
									...(account?.favouritePlaylists ?? []),
									...(account?.myPlaylists ?? []),
								]
									.map((p: IAlbum | IPlaylist) => {
										return p.tracks.map((track: ITrack, index: number) => ({
											title: track.title,
											author: p.author.name,
											duration: track.duration,
											src: track.path,
											srcImg: track.imgSrc,
											index: index + 1,
											playlistId: p?.$id ? p.$id : '',
											albumId: p?.$id ? p.$id : '',
											trackId: track.$id,
										}))
									})
									.flat()
							)
						}
						playAudio(currentSong.src)
					} else {
						selectAudio(songList[0])
					}
				}}
				style={
					isPlaying &&
					(currentSong.albumId === id || currentSong.playlistId === id)
						? {
								opacity: 1,
								transform: 'none',
								// eslint-disable-next-line no-mixed-spaces-and-tabs
						  }
						: {}
				}
				className={styles.btn_div}
			>
				<PlayButton
					playingStatus={
						isPlaying &&
						(currentSong.albumId === id || currentSong.playlistId === id)
					}
					color={'green'}
				/>
			</div>
		</Link>
	)
}
