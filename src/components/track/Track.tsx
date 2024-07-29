import { useState } from 'react'
import { CardPlayIcon } from '../../assets/icons/CardPlayIcon'
import styles from './track.module.css'

interface TrackProps {
	title: string
	id: number
	author: string
}

export const Track = ({ id, author, title }: TrackProps) => {
	const [isHover, setIsHover] = useState(false)

	return (
		<div onMouseDown={() => setIsHover(!isHover)} className={styles.track}>
			{isHover ? <CardPlayIcon /> : <span className={styles.id}>{id}</span>}
			<div className={styles.text}>
				<span className={styles.title}>{title}</span>
				<span className={styles.author}>{author}</span>
			</div>
			<span className={styles.time}></span>
		</div>
	)
}
