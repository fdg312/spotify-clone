import { Link } from 'react-router-dom'
import { TriangleArrowIcon } from '../../../assets/icons/TriangleArrowicon'
import { DropdownProps } from '../../../constants/dropdown'
import styles from './dropdown.module.css'

export const Dropdown = ({ elements }: DropdownProps) => {
	console.log(elements[0])

	return (
		<div onClick={e => e.stopPropagation()} className={styles.dropdown}>
			<div className={styles.elements}>
				{elements.map(
					({
						title,
						icon: Icon,
						link,
						onClick,
						arrowIcon,
						onMouseEnter,
						onMouseLeave,
					}) => (
						<div
							onMouseLeave={onMouseLeave}
							onMouseEnter={onMouseEnter}
							onClick={onClick}
							key={title}
							className={styles.element}
						>
							<div className={styles.startblock}>
								{Icon && <Icon />}
								{link ? <Link to={link}>{title}</Link> : <span>{title}</span>}
							</div>
							{arrowIcon && <TriangleArrowIcon />}
						</div>
					)
				)}
			</div>
		</div>
	)
}
