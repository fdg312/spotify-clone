import { Link } from 'react-router-dom'
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
				<PlayButton color={'green'} />
			</div>
		</Link>
	)
}

export default AlbumCard
