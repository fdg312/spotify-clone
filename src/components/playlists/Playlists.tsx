import PlaylistCard from '../playlistCard/PlaylistCard'
import styles from './playlists.module.css'

interface PlaylistsProps {
	title: string
	playlists: Array<{
		title: string
		desc: string
		imgSrc: string
	}>
}

const Playlists = ({ title, playlists }: PlaylistsProps) => {
	return (
		<>
			<h2 className={styles.title}>{title}</h2>
			<div className={styles.playlists}>
				{playlists.map(playlist => (
					<div key={playlist.title}>
						<PlaylistCard
							title={playlist.title}
							desc={playlist.desc}
							src={playlist.imgSrc}
						/>
					</div>
				))}
			</div>
		</>
	)
}

export default Playlists
