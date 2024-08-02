import { AudioProvider } from './AudioProvider'
import { AuthAlertProvider } from './AuthAlertProvider'

const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<AuthAlertProvider>
			<AudioProvider>{children}</AudioProvider>
		</AuthAlertProvider>
	)
}

export default Providers
