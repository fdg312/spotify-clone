import SongItem from '../songItem/SongItem'
import styles from './songlist.module.css'

export interface SongListProps {
	title: string
	author: string
	duration: number
	srcImg: string
	id: number
	path: string
}

const SongList = ({ songs }: { songs: SongListProps[] }) => {
	return (
		<div className={styles.songlist}>
			{songs.map((song: SongListProps, id: number) => (
				<SongItem
					key={id}
					title={song.title}
					author={song.author ?? ''}
					duration={song.duration}
					url={song.path}
					id={id + 1}
				/>
			))}
		</div>
	)
}

export default SongList
