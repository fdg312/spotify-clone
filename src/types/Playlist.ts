import { Models } from 'appwrite'
import { IAccount } from './Account'
import { ITrack } from './Track'

export interface IPlaylist extends Models.Document {
	title: string
	description: string
	imgSrc: string
	accounts: IAccount
	tracks: ITrack[]
}
