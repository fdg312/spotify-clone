import { Link } from 'react-router-dom'
import { NoteIcon } from '../../assets/icons/NoteIcon'
import { IAccount } from '../../types/Account'
import { PlayButton } from '../ui/button/playButton/PlayButton'
import styles from './librarycard.module.css'

export const LibraryCard = ({
	src,
	title,
	author,
	account,
	id,
}: {
	src?: string
	title: string
	author?: string
	account?: IAccount
	id: string
}) => {
	return (
		<Link
			// style={{ textDecoration: 'none', color: 'inherit' }}
			className={styles.card}
			to={`/playlist/${id}`}
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
					<span className={styles.type}>{author ? 'Album' : 'Playlist'}</span>
					<span className={styles.divider}>•</span>
					<Link to='#' className={styles.author}>
						{author ? author : account?.displayName}
					</Link>
				</div>
			</div>
			<div className={styles.btn_div}>
				<PlayButton color={'green'} />
			</div>
		</Link>
	)
}
