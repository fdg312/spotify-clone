import { createContext, useContext, useState } from 'react'

interface AudioContextProps {
	isPlaying: boolean
	playAudio: (src: string) => void
	pauseAudio: () => void
	selectAudio: (song: IAudioSong) => void
	setCurrentSong: React.Dispatch<React.SetStateAction<IAudioSong>>
	currentSong: IAudioSong
}

interface IAudioSong {
	title: string
	author: string
	duration: number
	src: string
}

export const AudioContext = createContext<AudioContextProps>({
	isPlaying: false,
	setCurrentSong: () => {},
	playAudio: () => {},
	pauseAudio: () => {},
	selectAudio: () => {},
	currentSong: {
		title: '',
		author: '',
		duration: 0,
		src: '',
	},
})
export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
	const [isPlaying, setIsPlaying] = useState(false)
	const [audio] = useState(new Audio())
	const [currentSong, setCurrentSong] = useState<IAudioSong>({
		title: '',
		author: '',
		duration: 0,
		src: '',
	})

	const playAudio = async (src: string) => {
		if (audio.src !== src) {
			audio.src = `../assets/songs/${src}`
		}
		console.log(audio)
		setIsPlaying(true)
	}

	const pauseAudio = () => {
		audio.pause()
		setIsPlaying(false)
	}

	const selectAudio = (song: IAudioSong) => {
		setCurrentSong(song)
		playAudio(song.src)
	}

	return (
		<AudioContext.Provider
			value={{
				isPlaying,
				currentSong,
				setCurrentSong,
				playAudio,
				pauseAudio,
				selectAudio,
			}}
		>
			{children}
		</AudioContext.Provider>
	)
}

export const useAudio = () => useContext(AudioContext)
