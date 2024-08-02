import { useContext, useState } from 'react'
import { PauseIcon } from '../../assets/icons/PauseIcon'
import { PlayIcon } from '../../assets/icons/PlayIcon'
import { AudioContext } from '../../providers/AudioProvider'
import { secondsToTime } from '../../utils/secondsToTime'
import styles from './songitem.module.css'

interface ISong {
	title: string
	author: string
	duration: number
	url: string
	id: number
	srcImg: string
}

const SongItem = ({ title, author, duration, url, id, srcImg }: ISong) => {
	const [isHover, setIsHover] = useState(false)
	const { selectAudio, currentSong, pauseAudio, isPlaying } =
		useContext(AudioContext)

	return (
		<div
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
			onDoubleClick={() =>
				selectAudio({
					title,
					author,
					src: url,
					duration,
					index: id,
					srcImg,
				})
			}
			className={styles.wrapper}
		>
			<div className={styles.main}>
				{isHover && (!isPlaying || currentSong.index !== id) ? (
					<div
						onClick={() =>
							selectAudio({
								title,
								author,
								src: url,
								duration,
								index: id,
								srcImg,
							})
						}
					>
						<PlayIcon />
					</div>
				) : currentSong.index === id && isPlaying ? (
					currentSong.index === id &&
					isPlaying && (
						<div
							className={
								(currentSong.index === id && styles.active) || undefined
							}
							onClick={() => {
								setIsHover(false)
								pauseAudio()
							}}
						>
							<PauseIcon />
						</div>
					)
				) : (
					<span
						className={
							styles.id + ' ' + (currentSong.index === id && styles.active)
						}
					>
						{id}
					</span>
				)}
				<div className={styles.text}>
					<h3
						className={
							styles.title + ' ' + (currentSong.index === id && styles.active)
						}
					>
						{title}
					</h3>
					<span className={styles.author}>{author}</span>
				</div>
			</div>
			<span className={styles.duration}>{secondsToTime(duration)}</span>
		</div>
	)
}

export default SongItem
