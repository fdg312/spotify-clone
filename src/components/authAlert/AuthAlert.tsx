import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthAlertContext } from '../../providers/AuthAlertProvider'
import styles from './authalert.module.css'

export const AuthAlert: React.FC = () => {
	const { alert, setAlert } = useContext(AuthAlertContext)

	return (
		alert && (
			<div className={styles.authalert}>
				<div className={styles.text}>
					<p className={styles.title}>Create a playlist</p>
					<p className={styles.desc}>Log in to create and share playlists.</p>
				</div>
				<div className={styles.buttons}>
					<button onClick={() => setAlert(false)} className={styles.not_now}>
						Not now
					</button>
					<Link to='/auth/login'>Log in</Link>
				</div>
			</div>
		)
	)
}
