import { CrossIcon } from '../../../../assets/icons/CrossIcon'
import styles from './myinput.module.css'

interface MyInputProps {
	type: string
	placeholder: string
	value: string
	onChange: React.ChangeEventHandler<HTMLInputElement>
	reset: () => void
	onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
	svgIcon?: JSX.Element
}

export const MyInput: React.FC<MyInputProps> = ({
	type,
	placeholder,
	value,
	onChange,
	reset,
	svgIcon,
	onKeyDown,
}) => {
	return (
		<div className={styles.input_div}>
			{svgIcon}
			<input
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				onKeyDown={onKeyDown}
			/>
			{value.length ? <CrossIcon onClick={reset} /> : null}
		</div>
	)
}
