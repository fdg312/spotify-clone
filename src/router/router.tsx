import { Provider } from 'react-redux'
import { createBrowserRouter, Outlet } from 'react-router-dom'
import Aside from '../components/aside/Aside'
import AudioPlayer from '../components/audioPlayer/AudioPlayer'
import { AuthAlert } from '../components/authAlert/AuthAlert'
import Header from '../components/header/Header'
import { Album, albumLoader } from '../pages/album/Album'
import Login from '../pages/auth/login/Login'
import SignUp from '../pages/auth/signup/SignUp'
import Genre from '../pages/genre/Genre'
import Home from '../pages/home/Home'
import Playlist, {
	playlistAction,
	playlistLoader,
} from '../pages/playlist/Playlist'
import { useAudio } from '../providers/AudioProvider'
import Providers from '../providers/Provider'
import { store } from '../store/store'

const RootLayout = () => {
	const { currentSong } = useAudio()

	return (
		<Providers>
			<Aside />
			<Header />
			<AuthAlert />
			<main
				style={{
					width: 'calc(80% - 15px)',
					float: 'right',
					marginBottom: currentSong.title.length ? '80px' : '0',
				}}
			>
				<Outlet />
			</main>
			<AudioPlayer />
		</Providers>
	)
}

export const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		children: [
			{
				path: '/',
				element: (
					<div style={{ height: '100%', overflowY: 'auto', flexGrow: 1 }}>
						<Home />
					</div>
				),
			},
			{
				path: '/album/:albumId',
				element: <Album />,
				loader: albumLoader,
			},
			{
				path: '/genre/:genreId',
				element: <Genre />,
			},
			{
				path: 'playlist/:playlistId',
				element: <Playlist />,
				loader: playlistLoader,
				action: playlistAction,
			},
		],
	},
	{
		path: '/auth/login',
		element: (
			<Provider store={store}>
				<Login />
			</Provider>
		),
	},
	{
		path: '/auth/signup',
		element: (
			<Provider store={store}>
				<SignUp />
			</Provider>
		),
	},
])
