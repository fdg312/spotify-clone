import { Models } from 'appwrite'
import { ITrack } from './Track'

export interface IPlaylist extends Models.Document {
	title: string
	description: string
	imgSrc: string
	tracks: ITrack[]
}
