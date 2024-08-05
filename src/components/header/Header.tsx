import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { SearchInputIcon } from '../../assets/icons/SearchInputIcon'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { getCurrent } from '../../store/auth/authActions'
import { MyInput } from '../ui/input/myinput/MyInput'
import styles from './header.module.css'

const Header = () => {
	const [inputValue, setInputValue] = useState('')
	const location = useLocation()
	const dispatch = useAppDispatch()
	const user = useAppSelector(state => state.auth.user)

	useEffect(() => {
		dispatch(getCurrent())
	}, [dispatch])

	return (
		<header className={styles.header + ' ' + styles.header}>
			<div>
				{location.pathname === '/' && (
					<MyInput
						type='text'
						placeholder='What do you want to play?'
						value={inputValue}
						onChange={e => setInputValue(e.target.value)}
						reset={() => setInputValue('')}
						svgIcon={<SearchInputIcon />}
					/>
				)}
			</div>
			{user === null && (
				<div className={styles.links}>
					<Link to='/auth/signup' className={styles.btn_signup}>
						Sign up
					</Link>
					<Link to='/auth/login' className={styles.btn_login}>
						Log in
					</Link>
				</div>
			)}
		</header>
	)
}

export default Header
