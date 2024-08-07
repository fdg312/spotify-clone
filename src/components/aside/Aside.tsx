import { ID, Permission, Role } from 'appwrite'
import { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { MediaLibraryIcon } from '../../assets/icons/MediaLibraryIcon'
import { SearchActiveIcon } from '../../assets/icons/SearchActiveIcon'
import { SearchIcon } from '../../assets/icons/SearchIcon'
import { SpotifyIcon } from '../../assets/icons/SpotifyIcon'
import { useAppSelector } from '../../hooks/reduxHooks'
import {
	COLLECTIONID_PLAYLISTS,
	DATABASEID,
	databases,
} from '../../lib/appwrite'
import { AuthAlertContext } from '../../providers/AuthAlertProvider'
import { LibraryCard } from '../libraryCard/LibraryCard'
import styles from './aside.module.css'

const Aside = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const { setAlert } = useContext(AuthAlertContext)
	const { error, loading, user, account } = useAppSelector(state => state.auth)

	const handleClick = async () => {
		if (error === null && !loading && user !== null) {
			const playlists = await databases.listDocuments(
				DATABASEID,
				COLLECTIONID_PLAYLISTS
			)
			const newPlaylist = await databases.createDocument(
				DATABASEID,
				COLLECTIONID_PLAYLISTS,
				ID.unique(),
				{
					title: `My Playlist №${playlists.total}`,
					imgSrc:
						'https://i.scdn.co/image/ab67706f000000028b7b685e7ef24f048048ba3e',
					accounts: account?.$id,
				},
				[
					Permission.delete(Role.user(user.$id)),
					Permission.read(Role.any()),
					Permission.update(Role.user(user.$id)),
				]
			)

			navigate(`/playlist/${newPlaylist.$id}`)
			return
		}
		setAlert(true)
	}

	return (
		<nav className={styles.aside}>
			<div className={styles.main_div}>
				<Link to='/' className={styles.logo}>
					<SpotifyIcon />
				</Link>
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
			{account?.favouriteAlbums ||
			account?.favouritePlaylists ||
			account?.myPlaylists ? (
				<div className={styles.libraries}>
					{account?.myPlaylists?.map(playlist => (
						<LibraryCard
							key={playlist.$id}
							title={playlist.title}
							src={playlist.imgSrc}
							account={account}
							id={playlist.$id}
						/>
					))}
				</div>
			) : (
				<div className={styles.createplaylist_div}>
					<div className={styles.text}>
						<p className={styles.title}>Create your first playlist</p>
						<p className={styles.desc}>It`s easy, we`ll help you</p>
					</div>
					<button onClick={handleClick} className={styles.btn}>
						Create playlist
					</button>
				</div>
			)}
		</nav>
	)
}

export default Aside
