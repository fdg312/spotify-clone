import { CardPlayIcon } from '../../../../assets/icons/CardPlayIcon'
import styles from './playbutton.module.css'

export const PlayButton = () => {
	return (
		<button className={styles.btn}>
			<CardPlayIcon />
		</button>
	)
}
