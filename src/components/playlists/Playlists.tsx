import { IPlaylist } from '../../types/Playlist'
import PlaylistCard from '../playlistCard/PlaylistCard'
import styles from './playlists.module.css'

interface PlaylistsProps {
	title: string
	playlists: IPlaylist[]
}

const Playlists = ({ title, playlists }: PlaylistsProps) => {
	return (
		<>
			<h2 className={styles.title}>{title}</h2>
			<div className={styles.playlists}>
				{playlists.map(playlist => (
					<div key={playlist.title}>
						<PlaylistCard
							id={playlist.$id}
							title={playlist.title}
							desc={playlist.description}
							src={playlist.imgSrc}
						/>
					</div>
				))}
			</div>
		</>
	)
}

export default Playlists
