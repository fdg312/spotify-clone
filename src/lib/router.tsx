import { createBrowserRouter, Outlet } from 'react-router-dom'
import Aside from '../components/aside/Aside'
import Header from '../components/header/Header'
import Login from '../pages/auth/login/Login'
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
])
