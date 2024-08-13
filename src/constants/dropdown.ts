import { FC } from 'react'
import { ArtistIcon } from '../assets/icons/ArtistIcon'
import { BinIcon } from '../assets/icons/BinIcon'
import { DiskIcon } from '../assets/icons/DiskIcon'
import { PlusIcon } from '../assets/icons/PlusIcon'

export interface DropdownProps {
	elements: Array<{
		title: string
		arrowIcon?: boolean
		icon?: FC
		link?: string
		onClick?: () => void
		onMouseEnter?: () => void
		onMouseLeave?: () => void
	}>
}

export const albumDropdownElements: DropdownProps['elements'] = [
	{
		title: 'Go to artist',
		icon: ArtistIcon,
	},
	{
		title: 'Go to album',
		icon: DiskIcon,
	},
]

export const avatarDropdownElements: DropdownProps['elements'] = [
	{
		title: 'Profile',
	},
	{
		title: 'Log out',
	},
]

export const SongItemContext: DropdownProps['elements'] = [
	{
		title: 'Add to playlist',
		icon: PlusIcon,
		arrowIcon: true,
	},
]

export const SongItemOwnerContext: DropdownProps['elements'] = [
	{
		title: 'Add to playlist',
		icon: PlusIcon,
		arrowIcon: true,
	},
	{
		title: 'Remove from this playlist',
		icon: BinIcon,
	},
]
