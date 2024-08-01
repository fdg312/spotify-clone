import { Models } from 'appwrite'
import { IAuthor } from './Author'
import { ISong } from './Song'

export interface IAlbum extends Models.Document {
	title: string
	author: IAuthor
	date: string
	imgSrc: string
	tracks: ISong[]
}
