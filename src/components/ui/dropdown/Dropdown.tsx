import { FC } from 'react'
import { Link } from 'react-router-dom'
import styles from './dropdown.module.css'

interface DropdownProps {
	elements: Array<{
		title: string
		icon?: FC
		link?: string
	}>
	isShow: boolean
}

export const Dropdown = ({ elements, isShow }: DropdownProps) => {
	return (
		isShow && (
			<div onClick={e => e.stopPropagation()} className={styles.dropdown}>
				<div className={styles.elements}>
					{elements.map(({ title, icon: Icon, link }) => (
						<div key={title} className={styles.element}>
							{Icon && <Icon />}
							{link ? <Link to={link}>{title}</Link> : <span>{title}</span>}
						</div>
					))}
				</div>
			</div>
		)
	)
}
