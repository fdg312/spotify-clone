import { SpotifySmallIcon } from '../../../assets/icons/SpotifySmallIcon'
import styles from './login.module.css'

const Login = () => {
	return (
		<main className={styles.main}>
			<div className={styles.wrapper}>
				<SpotifySmallIcon />
				<h1>Login in Spotify</h1>
			</div>
		</main>
	)
}

export default Login
