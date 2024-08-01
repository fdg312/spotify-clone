import { Models } from 'appwrite'
import { IAuthor } from './Author'

export interface ISong extends Models.Document {
	title: string
	path: string
	duration: number
	author: IAuthor
}
