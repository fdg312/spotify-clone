import { ID } from 'appwrite'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SpotifySmallIcon } from '../../../assets/icons/SpotifySmallIcon'
import { AuthButton } from '../../../components/ui/button/authButton/AuthButton'
import { AuthInput } from '../../../components/ui/input/authinput/AuthInput'
import { account } from '../../../lib/appwrite'
import styles from './signup.module.css'

const SignUp = () => {
	const [form, setForm] = useState({ email: '', password: '', username: '' })

	const register = async ({
		email,
		password,
		username,
	}: {
		email: string
		password: string
		username: string
	}) => {
		await account.create(ID.unique(), email, password, username)
		await account.createEmailPasswordSession(email, password)

		console.log(await account.get())
	}

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		console.log(form)

		register(form)
	}

	return (
		<main className={styles.main}>
			<div className={styles.wrapper}>
				<SpotifySmallIcon />
				<h1 className={styles.title}>Signup in Spotify</h1>
				<hr />
				<form onSubmit={onSubmit} className={styles.form}>
					<div className={styles.inputs}>
						<AuthInput
							onChange={e => setForm({ ...form, email: e.target.value })}
							value={form.email}
							type='email'
							placeholder='Email'
						/>
						<AuthInput
							onChange={e => setForm({ ...form, username: e.target.value })}
							value={form.username}
							type='username'
							placeholder='Username'
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
					<Link to='/auth/login' className={styles.link}>
						Login in Spotify
					</Link>
				</div>
			</div>
		</main>
	)
}

export default SignUp
