import AlbumCard from '../albumCard/AlbumCard'
import styles from './albums.module.css'

interface AlbumsProps {
	title: string
	albums: Array<{
		title: string
		author: string
		imgSrc: string
	}>
}

const Albums = ({ title, albums }: AlbumsProps) => {
	return (
		<>
			<h2 className={styles.title}>{title}</h2>
			<div className={styles.albums}>
				{albums.map(album => (
					<div key={album.title}>
						<AlbumCard
							title={album.title}
							author={album.author}
							src={album.imgSrc}
						/>
					</div>
				))}
			</div>
		</>
	)
}

export default Albums
