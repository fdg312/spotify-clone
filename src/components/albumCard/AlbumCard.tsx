import { Link } from 'react-router-dom'
import { useAudio } from '../../providers/AudioProvider'
import { PlayButton } from '../ui/button/playButton/PlayButton'
import styles from './albumcard.module.css'

const AlbumCard = ({
	src,
	title,
	author,
	id,
}: {
	src: string
	title: string
	author: string
	id: string
}) => {
	const {
		isPlaying,
		pauseAudio,
		currentSong,
		playAudio,
		selectAudio,
		songList,
	} = useAudio()

	return (
		<Link
			// style={{ textDecoration: 'none', color: 'inherit' }}
			className={styles.card}
			to={`/album/${id}`}
		>
			<img src={src} alt={title} />
			<div className={styles.text}>
				<p className={styles.title}>{title}</p>
				<p className={styles.author}>{author}</p>
			</div>
			<div className={styles.btn_div}>
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
						playingStatus={isPlaying && currentSong.albumId === id}
						color='green'
					/>
				</div>
			</div>
		</Link>
	)
}

export default AlbumCard
