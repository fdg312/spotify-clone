import { CrossIcon } from '../../../assets/icons/CrossIcon'
import styles from './myinput.module.css'

interface MyInputProps {
	type: string
	placeholder: string
	value: string
	onChange: React.ChangeEventHandler<HTMLInputElement>
	reset: () => void
	svgIcon?: JSX.Element
}

export const MyInput: React.FC<MyInputProps> = ({
	type,
	placeholder,
	value,
	onChange,
	reset,
	svgIcon,
}) => {
	return (
		<div className={styles.input_div}>
			{svgIcon}
			<input
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
			/>
			{value.length ? <CrossIcon onClick={reset} /> : null}
		</div>
	)
}
