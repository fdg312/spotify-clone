import { useEffect } from 'react'
import { useAudio } from '../../providers/AudioProvider'
import { IAlbum } from '../../types/Album'
import { IPlaylist } from '../../types/Playlist'
import { ITrack } from '../../types/Track'
import SongItem from '../songItem/SongItem'
import styles from './songlist.module.css'

// export interface SongListProps
const SongList = ({
	songs,
	playlist,
	album,
}: {
	songs: ITrack[]
	album?: IAlbum
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
				srcImg: album?.$id ? album?.imgSrc : songs[0].album.imgSrc,
				index: index + 1,
				playlistId: playlist?.$id ? playlist.$id : '',
				albumId: album?.$id ? album.$id : '',
				trackId: song.$id,
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
					srcImg={album?.$id ? album?.imgSrc : song.album.imgSrc}
					playlist={playlist}
					trackId={song.$id}
					album={album}
				/>
			))}
		</div>
	)
}

export default SongList
