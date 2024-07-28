import { CardPlayIcon } from '../../../../assets/icons/CardPlayIcon'
import styles from './playbutton.module.css'

export const PlayButton = ({
	color = 'green',
}: {
	color: 'green' | 'white'
}) => {
	return (
		<button className={styles.btn + ' ' + styles[color]}>
			<CardPlayIcon />
		</button>
	)
}
