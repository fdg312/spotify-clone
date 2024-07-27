import { useState } from 'react'
import { SpotifySmallIcon } from '../../../assets/icons/SpotifySmallIcon'
import { AuthButton } from '../../../components/ui/button/authButton/AuthButton'
import { AuthInput } from '../../../components/ui/input/authinput/AuthInput'
import styles from './signup.module.css'

const SignUp = () => {
	const [form, setForm] = useState({ email: '', password: '', username: '' })

	return (
		<main className={styles.main}>
			<div className={styles.wrapper}>
				<SpotifySmallIcon />
				<h1 className={styles.title}>Login in Spotify</h1>
				<hr />
				<form className={styles.form}>
					<div className={styles.inputs}>
						<AuthInput
							onChange={e => setForm({ ...form, email: e.target.value })}
							value={form.email}
							type='email'
							placeholder='Email or username'
						/>
						<AuthInput
							onChange={e => setForm({ ...form, password: e.target.value })}
							value={form.password}
							type='password'
							placeholder='Password'
						/>
					</div>
					<AuthButton>Log in</AuthButton>
				</form>
				<hr />
				<div className={styles.not_account}>
					<span>Do you have an account?</span>
					<span className={styles.link}>Sign up in Spotify</span>
				</div>
			</div>
		</main>
	)
}

export default SignUp
