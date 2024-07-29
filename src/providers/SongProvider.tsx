import { createContext, useState } from 'react'

interface AuthAlertContextProps {
	isPlaying: boolean
	setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
}

export const SongContext = createContext<AuthAlertContextProps>({
	isPlaying: false,
	setIsPlaying: () => {},
})

export const SongProvider = ({ children }: { children: React.ReactNode }) => {
	const [isPlaying, setIsPlaying] = useState(false)

	return (
		<SongContext.Provider value={{ isPlaying, setIsPlaying }}>
			{children}
		</SongContext.Provider>
	)
}
