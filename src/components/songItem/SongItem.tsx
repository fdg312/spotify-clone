import { useContext, useState } from 'react'
import { PlayIcon } from '../../assets/icons/PlayIcon'
import { SongContext } from '../../providers/SongProvider'
import styles from './songitem.module.css'

interface ISong {
	title: string
	author: string
	duration: number
	url: string
	id: number
	srcImg?: string
}

const SongItem = ({ title, author, duration, url, id }: ISong) => {
	const [isHover, setIsHover] = useState(false)
	const { setCurrentSong } = useContext(SongContext)

	function secondsToTime(time: number) {
		const m = Math.floor((time % 3600) / 60)
				.toString()
				.padStart(2, '0'),
			s = Math.floor(time % 60)
				.toString()
				.padStart(2, '0')

		return m + ':' + s
	}

	return (
		<div
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
			className={styles.wrapper}
		>
			<div className={styles.main}>
				{isHover ? (
					<div onClick={() => setCurrentSong({ title, author, url, duration })}>
						<PlayIcon />
					</div>
				) : (
					<span className={styles.id}>{id}</span>
				)}
				<div className={styles.text}>
					<h3 className={styles.title}>{title}</h3>
					<span className={styles.author}>{author}</span>
				</div>
			</div>
			<span className={styles.duration}>{secondsToTime(duration)}</span>
		</div>
	)
}

export default SongItem
