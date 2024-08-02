import { Models } from 'appwrite'
import { IAuthor } from './Author'

export interface ITrack extends Models.Document {
	title: string
	path: string
	duration: number
	author: IAuthor
}
