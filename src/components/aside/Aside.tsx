import { useLocation } from 'react-router-dom'
import { MediaLibraryIcon } from '../../assets/icons/MediaLibraryIcon'
import { SearchActiveIcon } from '../../assets/icons/SearchActiveIcon'
import { SearchIcon } from '../../assets/icons/SearchIcon'
import { SpotifyIcon } from '../../assets/icons/SpotifyIcon'
import styles from './aside.module.css'

const Aside = () => {
	const location = useLocation()

	return (
		<nav className={styles.aside}>
			<div className={styles.main_div}>
				<div className={styles.logo}>
					<SpotifyIcon />
				</div>
				<div
					className={`${styles.search_link} ${
						location.pathname === '/' ? styles.active : ''
					}`}
				>
					{location.pathname === '/' ? <SearchActiveIcon /> : <SearchIcon />}
					<span>Search</span>
				</div>
			</div>
			<div className={styles.medialibrary_div}>
				<div className={styles.medialibrary_link}>
					<MediaLibraryIcon />
					<span>Your Library</span>
				</div>
			</div>
			<div className={styles.createplaylist_div}>
				<div className={styles.text}>
					<p className={styles.title}>Create your first playlist</p>
					<p className={styles.desc}>It`s easy, we`ll help you</p>
				</div>
				<button className={styles.btn}>Create playlist</button>
			</div>
			<div className='auth-alert'></div>
		</nav>
	)
}

export default Aside
