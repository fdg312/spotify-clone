import { PlayButton } from '../ui/button/playButton/PlayButton'
import styles from './albumcard.module.css'

const AlbumCard = ({
	src,
	title,
	author,
}: {
	src: string
	title: string
	author: string
}) => {
	return (
		<div className={styles.card}>
			<img src={src} alt={title} />
			<div className={styles.text}>
				<p className={styles.title}>{title}</p>
				<p className={styles.author}>{author}</p>
			</div>
			<div className={styles.btn_div}>
				<PlayButton color={'green'} />
			</div>
		</div>
	)
}

export default AlbumCard
