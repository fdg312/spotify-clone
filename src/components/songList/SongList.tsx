import { Models } from 'appwrite'
import { useContext } from 'react'
import { SongContext } from '../../providers/SongProvider'

const SongList = ({ songs }: { songs: Models.Document[] }) => {
	const { currentSong } = useContext(SongContext)
	console.log(songs)

	return (
		<div>
			{songs.map(song => (
				<div key={song.$id}>{song.title}</div>
			))}
		</div>
	)
}

export default SongList
