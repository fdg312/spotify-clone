import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { SearchInputIcon } from '../../assets/icons/SearchInputIcon'
import { MyInput } from '../ui/input/myinput/MyInput'
import styles from './header.module.css'

const Header = () => {
	const [inputValue, setInputValue] = useState('')
	const location = useLocation()

	return (
		<header className={styles.header}>
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
			<div>
				<Link to='/auth/signup' className={styles.btn_signup}>
					Sign up
				</Link>
				<Link to='/auth/login' className={styles.btn_login}>
					Log in
				</Link>
			</div>
		</header>
	)
}

export default Header
