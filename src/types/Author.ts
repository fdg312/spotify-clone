import { Models } from 'appwrite'
import { ISong } from './Song'

export interface IAuthor extends Models.Document {
	name: string
	tracks: ISong[]
}
