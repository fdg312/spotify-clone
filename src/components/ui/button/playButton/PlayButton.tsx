import { PauseIcon } from '../../../../assets/icons/PauseIcon'
import { PlayIcon } from '../../../../assets/icons/PlayIcon'
import styles from './playbutton.module.css'

export const PlayButton = ({
	color = 'green',
	playingStatus = false,
}: {
	color: 'green' | 'white'
	playingStatus: boolean
}) => {
	return (
		<button className={styles.btn + ' ' + styles[color]}>
			{playingStatus ? <PauseIcon /> : <PlayIcon />}
		</button>
	)
}
