import { useEffect, useState } from 'react'
import styles from './rangeslider.module.css'

interface RangeSliderProps {
	max: number
	min: number
	step: number
	value: number
	onChange: (value: number) => void
	onMouseDown?: () => void
	onMouseUp?: () => void
}

const RangeSlider = ({
	min,
	max,
	step,
	value,
	onChange,
	onMouseDown,
	onMouseUp,
}: RangeSliderProps) => {
	const percentage = ((value - min) / (max - min)) * 100
	const [background, setBackground] = useState('var(--text-grey)')
	const [hover, setHover] = useState(false)

	useEffect(() => {
		if (hover) {
			setBackground(
				`linear-gradient(to right, var(--green) 0%, var(--green) ${percentage}%, rgba(255, 255, 255, 0.3) ${percentage}%, rgba(255, 255, 255, 0.3) 100%)`
			)
		} else {
			setBackground(
				`linear-gradient(to right, var(--text-grey) 0%, var(--text-grey) ${percentage}%, rgba(255, 255, 255, 0.3) ${percentage}%, rgba(255, 255, 255, 0.3) 100%)`
			)
		}
	}, [percentage, hover])

	return (
		<input
			className={styles.slider + ' ' + (hover ? styles.active : '')}
			style={{
				background,
			}}
			type='range'
			min={min}
			max={max}
			step={step}
			value={value}
			onChange={e => onChange(+e.target.value)}
			onMouseDown={() => onMouseDown?.()}
			onMouseUp={() => onMouseUp?.()}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
		/>
	)
}

export default RangeSlider
