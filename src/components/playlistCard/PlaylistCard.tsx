import { PlayButton } from '../ui/button/playButton/PlayButton'
import styles from './playlistcard.module.css'

const PlaylistCard = ({
	src,
	title,
	desc,
}: {
	src: string
	title: string
	desc: string
}) => {
	return (
		<div className={styles.card}>
			<img src={src} alt={title} />
			<div className={styles.text}>
				<p className={styles.title}>{title}</p>
				<p className={styles.desc}>{desc}</p>
			</div>
			<div className={styles.btn_div}>
				<PlayButton />
			</div>
		</div>
	)
}

export default PlaylistCard
