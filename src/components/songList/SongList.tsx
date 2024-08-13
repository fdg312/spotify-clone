import { useEffect } from 'react'
import { useAudio } from '../../providers/AudioProvider'
import { IPlaylist } from '../../types/Playlist'
import { ITrack } from '../../types/Track'
import SongItem from '../songItem/SongItem'
import styles from './songlist.module.css'

// export interface SongListProps
const SongList = ({
	songs,
	playlist,
}: {
	songs: ITrack[]
	playlist?: IPlaylist
}) => {
	const { setSongList } = useAudio()

	useEffect(() => {
		setSongList(
			songs.map((song: ITrack, index: number) => ({
				title: song.title,
				author: song.author.title,
				duration: song.duration,
				src: song.path,
				srcImg: song.album.imgSrc,
				index: index + 1,
				time: 0,
			}))
		)
	}, [])

	return (
		<div className={styles.songlist}>
			{songs.map((song: ITrack, id: number) => (
				<SongItem
					key={id}
					title={song.title}
					author={song.author.name}
					duration={song.duration}
					url={song.path}
					id={id + 1}
					srcImg={song.album.imgSrc}
					album={song.album}
					playlist={playlist}
					trackId={song.$id}
				/>
			))}
		</div>
	)
}

export default SongList
