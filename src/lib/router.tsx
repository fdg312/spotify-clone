import { createBrowserRouter, Outlet } from 'react-router-dom'
import Aside from '../components/aside/Aside'
import Header from '../components/header/Header'
import Home from '../pages/home/Home'

const Layout = () => (
	<>
		<Aside />
		<Header />
		<Outlet />
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
])
