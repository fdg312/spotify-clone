import styles from './authbutton.module.css'

interface AuthButtonProps {
	children: React.ReactNode
}

export const AuthButton: React.FC<AuthButtonProps> = ({ children }) => {
	return (
		<button type='submit' className={styles.btn}>
			{children}
		</button>
	)
}
