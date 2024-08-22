import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { SearchInputIcon } from '../../assets/icons/SearchInputIcon'
import { avatarDropdownElements } from '../../constants/dropdown'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { getCurrent, logout } from '../../store/auth/authActions'
import { Dropdown } from '../ui/dropdown/Dropdown'
import { MyInput } from '../ui/input/myinput/MyInput'
import styles from './header.module.css'

const Header = () => {
	const [inputValue, setInputValue] = useState('')
	const [isDropdown, setIsDropdown] = useState(false)
	const [_, setSearchParams] = useSearchParams()
	const dropdownRef = useRef<HTMLDivElement>(null)
	const avatarRef = useRef<HTMLDivElement>(null)
	const location = useLocation()
	const dispatch = useAppDispatch()
	const { user, account } = useAppSelector(state => state.auth)

	useEffect(() => {
		avatarDropdownElements[avatarDropdownElements.length - 1].onClick = () => {
			dispatch(logout())
		}
	}, [])

	useEffect(() => {
		dispatch(getCurrent())
	}, [dispatch])

	const handleClickOutside = (event: MouseEvent) => {
		if (
			!dropdownRef.current?.contains(event.target as Node) &&
			!avatarRef.current?.contains(event.target as Node)
		) {
			setIsDropdown(false)
		}
	}

	useEffect(() => {
		if (isDropdown) {
			document.addEventListener('mousedown', handleClickOutside)
			return () => {
				document.removeEventListener('mousedown', handleClickOutside)
			}
		}
	}, [isDropdown])

	const handleEnterClickOnInput = (
		e: React.KeyboardEvent<HTMLInputElement>
	) => {
		if (e.key === 'Enter') {
			setSearchParams({
				query: inputValue,
			})
		}
	}

	return (
		<header className={styles.header + ' ' + styles.header}>
			<div>
				{location.pathname === '/' && (
					<MyInput
						type='text'
						placeholder='Type and click "Enter"'
						value={inputValue}
						onChange={e => {
							setInputValue(e.target.value)
							setSearchParams({ query: '' })
						}}
						reset={() => setInputValue('')}
						onKeyDown={handleEnterClickOnInput}
						svgIcon={<SearchInputIcon />}
					/>
				)}
			</div>
			{user === null ? (
				<div className={styles.links}>
					<Link to='/auth/signup' className={styles.btn_signup}>
						Sign up
					</Link>
					<Link to='/auth/login' className={styles.btn_login}>
						Log in
					</Link>
				</div>
			) : (
				<div
					style={{ backgroundColor: account?.avatarColor }}
					onClick={() => setIsDropdown(!isDropdown)}
					className={styles.avatar}
					ref={avatarRef}
				>
					{account?.displayName[0].toUpperCase()}
					{isDropdown && (
						<div className={styles.dropdown} ref={dropdownRef}>
							<Dropdown elements={avatarDropdownElements} />
						</div>
					)}
				</div>
			)}
		</header>
	)
}

export default Header
