import { Provider } from 'react-redux'
import { store } from '../store/store'
import { AudioProvider } from './AudioProvider'
import { AuthAlertProvider } from './AuthAlertProvider'

const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<Provider store={store}>
			<AuthAlertProvider>
				<AudioProvider>{children}</AudioProvider>
			</AuthAlertProvider>
		</Provider>
	)
}

export default Providers
