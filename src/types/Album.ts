import { Models } from 'appwrite'
import { IAuthor } from './Author'
import { ITrack } from './Track'

export interface IAlbum extends Models.Document {
	title: string
	author: IAuthor
	date: string
	imgSrc: string
	tracks: ITrack[]
}
