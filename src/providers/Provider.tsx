import { AuthAlertProvider } from './AuthAlertProvider'
import { SongProvider } from './SongProvider'

const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<AuthAlertProvider>
			<SongProvider>{children}</SongProvider>
		</AuthAlertProvider>
	)
}

export default Providers
