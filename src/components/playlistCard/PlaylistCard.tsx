import { Link } from 'react-router-dom'
import { PlayButton } from '../ui/button/playButton/PlayButton'
import styles from './playlistcard.module.css'

const PlaylistCard = ({
	src,
	title,
	desc,
	id,
}: {
	id: string
	src: string
	title: string
	desc: string
}) => {
	return (
		<Link to={`/playlist/${id}`} className={styles.card}>
			<img src={src} alt={title} />
			<div className={styles.text}>
				<p className={styles.title}>{title}</p>
				<p className={styles.desc}>{desc}</p>
			</div>
			<div className={styles.btn_div}>
				<PlayButton color={'green'} />
			</div>
		</Link>
	)
}

export default PlaylistCard
