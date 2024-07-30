import { createContext, useState } from 'react'

interface AuthAlertContextProps {
	isPlaying: boolean
	setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
	setCurrentSong: React.Dispatch<React.SetStateAction<ISong>>
	currentSong: ISong
}

interface ISong {
	title: string
	author: string
	duration: number
	url: string
}

export const SongContext = createContext<AuthAlertContextProps>({
	isPlaying: false,
	setIsPlaying: () => {},
	currentSong: {
		title: '',
		author: '',
		duration: 0,
		url: '',
	},
	setCurrentSong: () => {},
})
export const SongProvider = ({ children }: { children: React.ReactNode }) => {
	const [isPlaying, setIsPlaying] = useState(false)
	const [currentSong, setCurrentSong] = useState<ISong>({
		title: '',
		author: '',
		duration: 0,
		url: '',
	})

	return (
		<SongContext.Provider
			value={{ isPlaying, setIsPlaying, currentSong, setCurrentSong }}
		>
			{children}
		</SongContext.Provider>
	)
}
