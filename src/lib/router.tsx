import { createBrowserRouter, Outlet } from 'react-router-dom'
import Aside from '../components/aside/Aside'
import Header from '../components/header/Header'
import Login from '../pages/auth/login/Login'
import SignUp from '../pages/auth/signup/SignUp'
import Genre from '../pages/genre/Genre'
import Home from '../pages/home/Home'

const Layout = () => (
	<>
		<Aside />
		<Header />
		<main style={{ width: 'calc(80% - 15px)', float: 'right' }}>
			<Outlet />
		</main>
	</>
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
		],
	},
	{
		path: '/auth/login',
		element: <Login />,
	},
	{
		path: '/auth/login',
		element: <SignUp />,
	},
	{
		path: '/genre/:genreId',
		element: <Genre />,
	},
])
