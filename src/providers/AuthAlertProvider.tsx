// AlertContext.js
import React, { createContext, useState, useContext } from 'react'

const AlertContext = createContext()

export const AlertProvider = ({ children }) => {
	const [alert, setAlert] = useState(null)

	const showAlert = (message, type = 'info') => {
		setAlert({ message, type })
		setTimeout(() => setAlert(null), 5000) // Auto-dismiss after 5 seconds
	}

	return (
		<AlertContext.Provider value={{ alert, showAlert }}>
			{children}
		</AlertContext.Provider>
	)
}

export const useAlert = () => useContext(AlertContext)
