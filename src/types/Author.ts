import { Models } from 'appwrite'
import { ITrack } from './Track'

export interface IAuthor extends Models.Document {
	name: string
	tracks: ITrack[]
}
