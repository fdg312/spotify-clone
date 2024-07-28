import { AuthButton } from '../../ui/button/authButton/AuthButton'
import { AuthInput } from '../../ui/input/authinput/AuthInput'
import styles from './authform.module.css'

interface FormField {
	value: string
	placeholder: string
	type: string
}

interface AuthFormProps {
	title: string
	values: {
		email: FormField
		password: FormField
		username?: FormField
	}
	setForm: React.Dispatch<
		React.SetStateAction<{
			email: FormField
			password: FormField
			username?: FormField
		}>
	>
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

const AuthForm: React.FC<AuthFormProps> = ({
	title,
	values,
	setForm,
	onSubmit,
}) => {
	const handleChange =
		(key: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement>) => {
			setForm(prev => ({
				...prev,
				[key]: {
					...prev[key],
					value: e.target.value,
				},
			}))
		}

	return (
		<form onSubmit={onSubmit} className={styles.form}>
			<div className={styles.inputs}>
				{Object.keys(values).map(key => (
					<AuthInput
						key={key}
						onChange={handleChange(key as keyof typeof values)}
						value={values[key as keyof typeof values]?.value || ''}
						type={values[key as keyof typeof values]?.type || 'text'}
						placeholder={values[key as keyof typeof values]?.placeholder || ''}
					/>
				))}
			</div>
			<AuthButton>{title}</AuthButton>
		</form>
	)
}

export default AuthForm
