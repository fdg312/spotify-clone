import { FC } from 'react'
import { ArtistIcon } from '../assets/icons/ArtistIcon'
import { DiskIcon } from '../assets/icons/DiskIcon'

interface DropdownProps {
	elements: Array<{
		title: string
		icon?: FC
		link?: string
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
