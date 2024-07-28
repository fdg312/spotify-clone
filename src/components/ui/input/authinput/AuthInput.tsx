import React, { useState } from 'react'
import { ClosedEyeIcon } from '../../../../assets/icons/ClosedEyeIcon'
import { OpenedEyeIcon } from '../../../../assets/icons/OpenedEyeIcon'
import styles from './authinput.module.css'

interface AuthInputProps {
	type: string
	placeholder: string
	value: string
	onChange: React.ChangeEventHandler<HTMLInputElement>
}

export const AuthInput: React.FC<AuthInputProps> = ({
	type,
	placeholder,
	value,
	onChange,
}) => {
	const [showPassword, setShowPassword] = useState(false)

	const togglePasswordVisibility = () => {
		setShowPassword(prevShowPassword => !prevShowPassword)
	}

	const inputType = type === 'password' && showPassword ? 'text' : type

	return (
		<label className={styles.input_label}>
			{placeholder}
			<input
				type={inputType}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				pattern={
					type === 'email' ? '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$' : undefined
				}
				maxLength={30}
				required
			/>
			{type === 'password' &&
				(showPassword ? (
					<OpenedEyeIcon onClick={togglePasswordVisibility} />
				) : (
					<ClosedEyeIcon onClick={togglePasswordVisibility} />
				))}
		</label>
	)
}
