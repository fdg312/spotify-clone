import { createContext, Dispatch, useContext, useEffect, useState } from 'react'

interface AudioContextProps {
	changeVolume: (integer: number) => void
	volume: number
	isPlaying: boolean
	playAudio: (src: string) => void
	pauseAudio: () => void
	selectAudio: (song: IAudioSong) => void
	currentSong: IAudioSong
	songList: IAudioSong[]
	setSongList: Dispatch<React.SetStateAction<IAudioSong[]>>
	playPrevSong: () => void
	playNextSong: () => void
	changeTime: (time: number) => void
}

interface IAudioSong {
	index: number | null
	title: string
	author: string
	duration: number
	src: string
	srcImg: string
	trackId: string
	albumId?: string
	playlistId?: string
	time?: number
}

export const AudioContext = createContext<AudioContextProps>({
	isPlaying: false,
	volume: 1,
	changeVolume: () => {},
	playAudio: () => {},
	pauseAudio: () => {},
	selectAudio: () => {},
	currentSong: {
		index: null,
		title: '',
		author: '',
		duration: 0,
		src: '',
		srcImg: '',
		trackId: '',
		albumId: '',
		playlistId: '',
		time: 0,
	},
	songList: [],
	setSongList: () => {},
	playPrevSong: () => {},
	playNextSong: () => {},
	changeTime: () => {},
})
export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
	const [isPlaying, setIsPlaying] = useState(false)
	const [audio] = useState(new Audio())
	const [songList, setSongList] = useState<IAudioSong[]>([])
	const [volume, setVolume] = useState(1)
	const [currentSong, setCurrentSong] = useState<IAudioSong>({
		title: '',
		author: '',
		duration: 0,
		src: '',
		srcImg: '',
		index: null,
		trackId: '',
		albumId: '',
		playlistId: '',
		time: 0,
	})

	useEffect(() => {
		const updateCurrentTime = () => {
			setCurrentSong(prevSong => ({ ...prevSong, time: audio.currentTime }))
		}

		audio.addEventListener('timeupdate', updateCurrentTime)

		return () => {
			audio.removeEventListener('timeupdate', updateCurrentTime)
		}
	}, [audio])

	const playAudio = async (src: string) => {
		if (currentSong.src !== src) {
			audio.src = `/src/assets/songs/${src}`
		} else {
			audio.currentTime = currentSong.time ?? 0
		}
		audio.play()
		setIsPlaying(true)
	}

	const pauseAudio = () => {
		console.log(currentSong, 123)

		audio.pause()
		setIsPlaying(false)
	}

	const selectAudio = (song: IAudioSong) => {
		if (audio.src !== song.src) {
			audio.src = `/src/assets/songs/${song.src}`
			setCurrentSong(song)
		}

		playAudio(song.src)
	}

	const playNextSong = () => {
		currentSong.time = 0
		if (currentSong.index === songList.length) {
			selectAudio(songList[0])
		} else {
			selectAudio(songList[currentSong.index!])
		}
	}

	const playPrevSong = () => {
		currentSong.time = 0
		if (currentSong.index === 1) {
			selectAudio(songList[songList.length - 1])
		} else {
			selectAudio(songList[currentSong.index! - 2])
		}
	}

	const changeVolume = (integer: number) => {
		setVolume(integer)
		audio.volume = integer
	}

	const changeTime = (time: number) => {
		console.log(time)

		setCurrentSong(prevSong => ({ ...prevSong, time }))
		audio.currentTime = time
	}

	return (
		<AudioContext.Provider
			value={{
				isPlaying,
				currentSong,
				playAudio,
				pauseAudio,
				selectAudio,
				songList,
				setSongList,
				playNextSong,
				playPrevSong,
				changeVolume,
				volume,
				changeTime,
			}}
		>
			{children}
		</AudioContext.Provider>
	)
}

export const useAudio = () => useContext(AudioContext)
