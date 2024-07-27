import styles from './categorycard.module.css'

interface CategoryCardProps {
	src: string
	title: string
	color: string
}

const CategoryCard = ({ src, color, title }: CategoryCardProps) => {
	return (
		<div className={styles.card} style={{ backgroundColor: color }}>
			<img src={src} alt={title} />
			<span>{title}</span>
		</div>
	)
}

export default CategoryCard
