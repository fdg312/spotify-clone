import styles from './authbutton.module.css'

interface AuthButtonProps {
	children: React.ReactNode
	disabled?: boolean
}

export const AuthButton: React.FC<AuthButtonProps> = ({
	children,
	disabled = false,
}) => {
	return (
		<button disabled={disabled} type='submit' className={styles.btn}>
			{children}
		</button>
	)
}
