import { Models } from 'appwrite'
import { IAlbum } from './Album'
import { IAuthor } from './Author'

export interface ITrack extends Models.Document {
	title: string
	path: string
	duration: number
	author: IAuthor
	album: IAlbum
}
