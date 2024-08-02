import { FC, useRef } from 'react'
import sound from '../../assets/songs/placebo_thecrawl.mp3'
import { useAudio } from '../../providers/AudioProvider'
import styles from './audioplayer.module.css'

const AudioPlayer: FC = () => {
	const { isPlaying, currentSong, pauseAudio, playAudio } = useAudio()
	const audioRef = useRef<HTMLAudioElement>(null)
	// const audioRef = useRef(new Audio('../../assets/songs/placebo_thecrawl.mp3'))
	// /src/assets/songs/placebo_thecrawl.mp3
	function playAudio2() {
		audioRef.current?.setAttribute(
			'src',
			'/src/assets/songs/placebo_thebitterend.mp3'
		)
	}

	return (
		<div className={styles.audioplayer}>
			{true && (
				<div>
					<h2>Now Playing: {currentSong.title}</h2>
					<button
						onClick={() =>
							isPlaying ? pauseAudio : playAudio(currentSong.src)
						}
					>
						{isPlaying ? 'Pause' : 'Play'}
					</button>
					<audio controls ref={audioRef} src={sound}></audio>
					<button onClick={() => playAudio2()}></button>
				</div>
			)}
		</div>
	)
}

export default AudioPlayer
