import styles from './authalert.module.css'

export const AuthAlert: React.FC = () => {
	return (
		<div className={styles.authalert}>
			<p className='title'>Create a playlist</p>
			<p className='text'>Log in to create and share playlists.</p>
			<button>Log in</button>
			<button>Sign in to your account</button>
		</div>
	)
}
