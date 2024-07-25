import styles from './header.module.css'

const Header = () => {
	return (
		<header className={styles.header}>
			<div>
				<span className={styles.btn_signup}>Sign up</span>
				<span className={styles.btn_login}>Log in</span>
			</div>
		</header>
	)
}

export default Header
