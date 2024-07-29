import { createContext, useState } from 'react'

interface AuthAlertContextProps {
	alert: boolean
	setAlert: React.Dispatch<React.SetStateAction<boolean>>
}

export const AuthAlertContext = createContext<AuthAlertContextProps>({
	alert: false,
	setAlert: () => {},
})

export const AuthAlertProvider = ({
	children,
}: {
	children: React.ReactNode
}) => {
	const [alert, setAlert] = useState(false)

	return (
		<AuthAlertContext.Provider value={{ alert, setAlert }}>
			{children}
		</AuthAlertContext.Provider>
	)
}
