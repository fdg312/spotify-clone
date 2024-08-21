import { FC, useEffect, useState } from 'react'
import { FullSpeakerIcon } from '../../assets/icons/FullSpeakerIcon'
import { LowSpeakerIcon } from '../../assets/icons/LowSpeakerIcon'
import { MidSpeakerIcon } from '../../assets/icons/MidSpeakerIcon'
import { NextSongIcon } from '../../assets/icons/NextSongIcon'
import { NoneSpeakerIcon } from '../../assets/icons/NoneSpeakerIcon'
import { PrevSongIcon } from '../../assets/icons/PrevSongIcon'
import { useAudio } from '../../providers/AudioProvider'
import { secondsToTime } from '../../utils/secondsToTime'
import { PlayButton } from '../ui/button/playButton/PlayButton'
import RangeSlider from '../ui/input/rangeSlider/RangeSlider'
import styles from './audioplayer.module.css'

const AudioPlayer: FC = () => {
	const {
		isPlaying,
		currentSong,
		pauseAudio,
		playAudio,
		volume,
		changeVolume,
		playNextSong,
		playPrevSong,
		changeTime,
	} = useAudio()

	const { duration, time } = currentSong
	const [temporaryTime, setTemporaryTime] = useState(time)
	const [notChangeable, setNotChangeable] = useState(false)

	useEffect(() => {
		if (notChangeable) {
			return
		}
		setTemporaryTime(time)
	}, [notChangeable, time])

	const handleChangeTime = (value: number) => {
		if (notChangeable) {
			setTemporaryTime(value)
			return
		}
		setTemporaryTime(value)
		changeTime(value)
	}

	const handleMouseUp = () => {
		setNotChangeable(false)
		changeTime(temporaryTime ?? 0)
	}

	return (
		<div className={styles.audioplayer}>
			{!!currentSong.title.length && (
				<div className={styles.wrapper}>
					<div className={styles.info}>
						<div className={styles.img}>
							<img src={currentSong.srcImg} alt={currentSong.title} />
						</div>
						<div className={styles.text}>
							<span className={styles.title}>{currentSong.title}</span>
							<span className={styles.author}>{currentSong.author}</span>
						</div>
					</div>
					<div className={styles.mid}>
						<div className={styles.controls}>
							<div onClick={() => playPrevSong()} className={styles.prevbutton}>
								<PrevSongIcon />
							</div>
							<div
								onClick={() =>
									isPlaying ? pauseAudio() : playAudio(currentSong.src)
								}
								className={styles.playbutton}
							>
								<PlayButton playingStatus={isPlaying} color='white' />
							</div>
							<div onClick={() => playNextSong()} className={styles.nextbutton}>
								<NextSongIcon />
							</div>
						</div>
						<div className={styles.duration}>
							<span className={styles.now_time}>
								{secondsToTime(temporaryTime ?? 0)}
							</span>
							<RangeSlider
								min={0}
								max={duration}
								step={1}
								value={temporaryTime ?? 0}
								onChange={handleChangeTime}
								onMouseDown={() => {
									setNotChangeable(true)
								}}
								onMouseUp={handleMouseUp}
							/>
							<span className={styles.all_time}>
								{secondsToTime(currentSong.duration)}
							</span>
						</div>
					</div>
					<div className={styles.volume}>
						<div
							onClick={() => changeVolume(volume > 0 ? 0 : 1)}
							className={styles.speaker}
						>
							{volume > 0.66 ? (
								<FullSpeakerIcon />
							) : volume > 0.33 ? (
								<MidSpeakerIcon />
							) : volume > 0 ? (
								<LowSpeakerIcon />
							) : (
								<NoneSpeakerIcon />
							)}
						</div>
						<RangeSlider
							min={0}
							max={1}
							step={0.01}
							value={volume}
							onChange={changeVolume}
						/>
					</div>
				</div>
			)}
		</div>
	)
}

export default AudioPlayer
