import CategoryCard from '../../components/categoryCard/CategoryCard'
import styles from './home.module.css'

const Home = () => {
	// const [genres, setGenres] = useState([])

	// useEffect(() => {
	// 	async function fetchData() {
	// 		const data = await SpotifyService.getGenres()
	// 		console.log(data.genres)

	// 		setGenres(data.genres)
	// 	}

	// 	fetchData()
	// }, [])

	return (
		<div className={styles.wrapper}>
			<h2 className={styles.title}>Browse all</h2>
			<div className={styles.cards}>
				<CategoryCard
					color='#8C1932'
					src='https://i.scdn.co/image/ab67fb8200005caf3f3de915ef4a9f3eaf242f02'
					title='Pop'
				/>
				<CategoryCard
					color='#8C1932'
					src='https://i.scdn.co/image/ab67fb8200005caf3f3de915ef4a9f3eaf242f02'
					title='Pop'
				/>
				<CategoryCard
					color='#8C1932'
					src='https://i.scdn.co/image/ab67fb8200005caf3f3de915ef4a9f3eaf242f02'
					title='Pop'
				/>
				<CategoryCard
					color='#8C1932'
					src='https://i.scdn.co/image/ab67fb8200005caf3f3de915ef4a9f3eaf242f02'
					title='Pop'
				/>
				<CategoryCard
					color='#8C1932'
					src='https://i.scdn.co/image/ab67fb8200005caf3f3de915ef4a9f3eaf242f02'
					title='Pop'
				/>
				<CategoryCard
					color='#8C1932'
					src='https://i.scdn.co/image/ab67fb8200005caf3f3de915ef4a9f3eaf242f02'
					title='Pop'
				/>
				<CategoryCard
					color='#8C1932'
					src='https://i.scdn.co/image/ab67fb8200005caf3f3de915ef4a9f3eaf242f02'
					title='Pop'
				/>
				<CategoryCard
					color='#8C1932'
					src='https://i.scdn.co/image/ab67fb8200005caf3f3de915ef4a9f3eaf242f02'
					title='Pop'
				/>
				<CategoryCard
					color='#8C1932'
					src='https://i.scdn.co/image/ab67fb8200005caf3f3de915ef4a9f3eaf242f02'
					title='Pop'
				/>
				<CategoryCard
					color='#8C1932'
					src='https://i.scdn.co/image/ab67fb8200005caf3f3de915ef4a9f3eaf242f02'
					title='Pop'
				/>
				<CategoryCard
					color='#8C1932'
					src='https://i.scdn.co/image/ab67fb8200005caf3f3de915ef4a9f3eaf242f02'
					title='Pop'
				/>
				<CategoryCard
					color='#8C1932'
					src='https://i.scdn.co/image/ab67fb8200005caf3f3de915ef4a9f3eaf242f02'
					title='Pop'
				/>
				<CategoryCard
					color='#8C1932'
					src='https://i.scdn.co/image/ab67fb8200005caf3f3de915ef4a9f3eaf242f02'
					title='Pop'
				/>
				<CategoryCard
					color='#8C1932'
					src='https://i.scdn.co/image/ab67fb8200005caf3f3de915ef4a9f3eaf242f02'
					title='Pop'
				/>
				<CategoryCard
					color='#8C1932'
					src='https://i.scdn.co/image/ab67fb8200005caf3f3de915ef4a9f3eaf242f02'
					title='Pop'
				/>
				<CategoryCard
					color='#8C1932'
					src='https://i.scdn.co/image/ab67fb8200005caf3f3de915ef4a9f3eaf242f02'
					title='Pop'
				/>
				<CategoryCard
					color='#8C1932'
					src='https://i.scdn.co/image/ab67fb8200005caf3f3de915ef4a9f3eaf242f02'
					title='Pop'
				/>
			</div>
		</div>
	)
}

export default Home
