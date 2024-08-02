import { Models } from 'appwrite'
import { ISong } from './Track'

export interface IAuthor extends Models.Document {
	name: string
	tracks: ISong[]
}
