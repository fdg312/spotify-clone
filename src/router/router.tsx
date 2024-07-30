import { createBrowserRouter, Outlet } from 'react-router-dom'
import Aside from '../components/aside/Aside'
import { AuthAlert } from '../components/authAlert/AuthAlert'
import Header from '../components/header/Header'
import { Album, albumLoader } from '../pages/album/Album'
import Login from '../pages/auth/login/Login'
import SignUp from '../pages/auth/signup/SignUp'
import Genre from '../pages/genre/Genre'
import Home from '../pages/home/Home'
import Providers from '../providers/Provider'

const RootLayout = () => (
	<Providers>
		<Aside />
		<Header />
		<AuthAlert />
		<main style={{ width: 'calc(80% - 15px)', float: 'right' }}>
			<Outlet />
		</main>
	</Providers>
)

export const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		children: [
			{
				path: '/',
				element: <Home />,
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
		],
	},
	{
		path: '/auth/login',
		element: <Login />,
	},
	{
		path: '/auth/signup',
		element: <SignUp />,
	},
])
