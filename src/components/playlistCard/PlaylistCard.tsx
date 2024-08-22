import { Link } from 'react-router-dom'
import { useAudio } from '../../providers/AudioProvider'
import { PlayButton } from '../ui/button/playButton/PlayButton'
import styles from './playlistcard.module.css'

const PlaylistCard = ({
	src,
	title,
	desc,
	id,
}: {
	id: string
	src?: string
	title: string
	desc: string
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
		<Link to={`/playlist/${id}`} className={styles.card}>
			<img src={src} alt={title} />
			<div className={styles.text}>
				<p className={styles.title}>{title}</p>
				<p className={styles.desc}>{desc}</p>
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
						playingStatus={isPlaying && currentSong.playlistId === id}
						color='green'
					/>
				</div>
			</div>
		</Link>
	)
}

export default PlaylistCard
