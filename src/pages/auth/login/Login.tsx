import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SpotifySmallIcon } from '../../../assets/icons/SpotifySmallIcon'
import AuthForm from '../../../components/form/authForm/AuthForm'
import styles from './login.module.css'

const Login = () => {
	const [form, setForm] = useState({
		email: { value: '', placeholder: 'Email or username', type: 'email' },
		password: { value: '', placeholder: 'Password', type: 'password' },
	})

	return (
		<main className={styles.main}>
			<div className={styles.wrapper}>
				<SpotifySmallIcon />
				<h1 className={styles.title}>Login in Spotify</h1>
				<hr />
				<AuthForm
					onSubmit={() => {}}
					title='Log in'
					values={form}
					setForm={setForm}
				/>
				<Link to='#' className={styles.link}>
					Forgot password?
				</Link>
				<hr />
				<div className={styles.not_account}>
					<span>Don't have an account?</span>
					<Link to='/auth/signup' className={styles.link}>
						Sign up in Spotify
					</Link>
				</div>
			</div>
		</main>
	)
}

export default Login
