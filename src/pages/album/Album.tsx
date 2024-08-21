import { useColor } from 'color-thief-react'
import { useContext, useEffect, useRef, useState } from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import { AddIcon } from '../../assets/icons/AddIcon'
import { ClockIcon } from '../../assets/icons/ClockIcon'
import { DotsIcon } from '../../assets/icons/DotsIcon'
import { TickIcon } from '../../assets/icons/TickIcon'
import SongList from '../../components/songList/SongList'
import { PlayButton } from '../../components/ui/button/playButton/PlayButton'
import { Dropdown } from '../../components/ui/dropdown/Dropdown'
import { albumDropdownElements } from '../../constants/dropdown'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import {
	COLLECTIONID_ACCOUNTS,
	DATABASEID,
	databases,
} from '../../lib/appwrite'
import { AuthAlertContext } from '../../providers/AuthAlertProvider'
import { getCurrent } from '../../store/auth/authActions'
import { IAlbum } from '../../types/Album'
import { ITrack } from '../../types/Track'
import styles from './album.module.css'

export const Album = () => {
	const album = useLoaderData() as IAlbum
	const { data } = useColor(album.imgSrc, 'rgbArray', {
		crossOrigin: 'quality',
	})
	const [isDropdown, setIsDropwdown] = useState(false)
	const [isFavourite, setIsFavourite] = useState(false)
	const dropdownRef = useRef<HTMLDivElement>(null)
	const dotsIconRef = useRef<HTMLDivElement>(null)
	const { setAlert } = useContext(AuthAlertContext)
	const { account, user, loading } = useAppSelector(state => state.auth)
	const dispatch = useAppDispatch()
	const [songs] = useState<ITrack[]>(album.tracks)

	useEffect(() => {
		if (!loading && account && album) {
			setIsFavourite(
				account.favouriteAlbums?.some(alb => alb.$id === album.$id) ?? false
			)
		}
	}, [loading, account, album])

	const handleClickOutside = (event: MouseEvent) => {
		if (
			!dropdownRef.current?.contains(event.target as Node) &&
			!dotsIconRef.current?.contains(event.target as Node)
		) {
			setIsDropwdown(false)
		}
	}

	const handleClickFavourite = async () => {
		if ((user === null && account === null) || loading) return setAlert(true)
		if (!account) return

		const isAlreadyFavourite = isFavourite && account.favouriteAlbums?.length

		const newFavouriteAlbums = isAlreadyFavourite
			? (account.favouriteAlbums ?? []).filter(alb => alb.$id !== album.$id)
			: [...(account.favouriteAlbums ?? []), album]
		await databases.updateDocument(
			DATABASEID,
			COLLECTIONID_ACCOUNTS,
			account.$id,
			{
				favouriteAlbums: newFavouriteAlbums,
			}
		)

		setIsFavourite(!isFavourite)

		dispatch(getCurrent())
	}

	useEffect(() => {
		if (isDropdown) {
			document.addEventListener('mousedown', handleClickOutside)
			return () => {
				document.removeEventListener('mousedown', handleClickOutside)
			}
		}
	}, [isDropdown])

	return (
		<div className={styles.wrapper}>
			<div
				style={{
					background: `linear-gradient(to bottom, rgb(${data?.[0]}, ${data?.[1]}, ${data?.[2]}), rgba(${data?.[0]}, ${data?.[1]}, ${data?.[2]}, 0.55))`,
				}}
				className={styles.upper}
			>
				<div className={styles.img}>
					<img src={album.imgSrc} alt={album.title} />
				</div>
				<div className={styles.info}>
					<span className={styles.type}>Album</span>
					<h1 className={styles.title}>{album.title}</h1>
					<div className={styles.data}>
						<Link to='#' className={styles.author}>
							{album.author.name}
						</Link>
						<span className={styles.divider}>•</span>
						<span className={styles.year}>
							{new Date(album.date).getFullYear()}
						</span>
						<span className={styles.divider}>•</span>
						<span className={styles.quantity}>{album.tracks.length} songs</span>
					</div>
				</div>
			</div>
			<div
				style={{
					background: `linear-gradient(to bottom, rgba(${data?.[0]}, ${data?.[1]}, ${data?.[2]}, 0.55), rgba(${data?.[0]}, ${data?.[1]}, ${data?.[2]}, 0.1)) 0% 0% / 100% 60% no-repeat`,
				}}
				className={styles.downer}
			>
				<div className={styles.buttons}>
					<PlayButton color='green' />
					<div onClick={handleClickFavourite} className={styles.add}>
						{!isFavourite ? <AddIcon /> : <TickIcon />}
					</div>
					<div
						onClick={() => setIsDropwdown(!isDropdown)}
						className={styles.dots}
					>
						<div
							onClick={() => setIsDropwdown(!isDropdown)}
							ref={dotsIconRef}
							className={styles.dots_icon}
						>
							<DotsIcon />
						</div>
						<div className={styles.dropdown} ref={dropdownRef}>
							{isDropdown && <Dropdown elements={albumDropdownElements} />}
						</div>
					</div>
				</div>
				<div className={styles.layout}>
					<div className={styles.leftlayout}>
						<span className={styles.id}>#</span>
						<span className={styles.leftlayout}>Title</span>
					</div>
					<div className={styles.rightlayout}>
						<ClockIcon />
					</div>
				</div>
				<SongList album={album} songs={songs} />
			</div>
		</div>
	)
}
