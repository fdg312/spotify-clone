import { useEffect } from 'react'
import { useAudio } from '../../providers/AudioProvider'
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
	const { setSongList } = useAudio()
	useEffect(() => {
		setSongList(
			songs.map((song: SongListProps, index: number) => ({
				title: song.title,
				author: song.author,
				duration: song.duration,
				src: song.path,
				srcImg: song.srcImg,
				index: index + 1,
			}))
		)
	}, [setSongList, songs])

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
					srcImg={song.srcImg}
				/>
			))}
		</div>
	)
}

export default SongList
