import { createBrowserRouter, Outlet } from 'react-router-dom'
import Aside from '../components/aside/Aside'
import { AuthAlert } from '../components/authAlert/AuthAlert'
import Header from '../components/header/Header'
import Login from '../pages/auth/login/Login'
import SignUp from '../pages/auth/signup/SignUp'
import Genre from '../pages/genre/Genre'
import Home from '../pages/home/Home'
import { AuthAlertProvider } from '../providers/AuthAlertProvider'

const Layout = () => (
	<AuthAlertProvider>
		<Aside />
		<Header />
		<AuthAlert />
		<main style={{ width: 'calc(80% - 15px)', float: 'right' }}>
			<Outlet />
		</main>
	</AuthAlertProvider>
)

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '/',
				element: <Home />,
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
