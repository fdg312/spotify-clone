import { useState } from 'react'
import { SearchInputIcon } from '../../assets/icons/SearchInputIcon'
import { MyInput } from '../ui/input/MyInput'
import styles from './header.module.css'

const Header = () => {
	const [inputValue, setInputValue] = useState('')

	return (
		<header className={styles.header}>
			<MyInput
				type='text'
				placeholder='What do you want to play?'
				value={inputValue}
				onChange={e => setInputValue(e.target.value)}
				reset={() => setInputValue('')}
				svgIcon={<SearchInputIcon />}
			/>
			<div>
				<span className={styles.btn_signup}>Sign up</span>
				<span className={styles.btn_login}>Log in</span>
			</div>
		</header>
	)
}

export default Header
