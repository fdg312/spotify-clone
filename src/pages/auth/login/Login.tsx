import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SpotifySmallIcon } from '../../../assets/icons/SpotifySmallIcon'
import AuthForm from '../../../components/form/authForm/AuthForm'
import { useAppDispatch } from '../../../hooks/reduxHooks'
import { login } from '../../../store/auth/authActions'
import styles from './login.module.css'

const Login = () => {
	const [form, setForm] = useState({
		email: { value: '', placeholder: 'Email or username', type: 'email' },
		password: { value: '', placeholder: 'Password', type: 'password' },
	})
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const onSubmit = (e: FormEvent) => {
		e.preventDefault()

		dispatch(
			login({
				email: form.email.value,
				password: form.password.value,
			})
		)
		navigate('/')
	}

	return (
		<main className={styles.main}>
			<div className={styles.wrapper}>
				<SpotifySmallIcon />
				<h1 className={styles.title}>Login in Spotify</h1>
				<hr />
				<AuthForm
					onSubmit={onSubmit}
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
