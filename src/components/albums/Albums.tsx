import { Models } from 'appwrite'
import AlbumCard from '../albumCard/AlbumCard'
import styles from './albums.module.css'

interface AlbumsProps {
	title: string
	albums: Models.Document[]
}

const Albums = ({ title, albums }: AlbumsProps) => {
	return (
		<>
			<h2 className={styles.title}>{title}</h2>
			<div className={styles.albums}>
				{albums.map(album => (
					<div key={album.title}>
						<AlbumCard
							id={album.$id}
							title={album.title}
							author={album.author.name}
							src={album.imgSrc}
						/>
					</div>
				))}
			</div>
		</>
	)
}

export default Albums
