import { Models } from 'appwrite'
import { IAlbum } from './Album'
import { IPlaylist } from './Playlist'
import { ITrack } from './Track'

export interface IAccount extends Models.Document {
	userId: string
	avatarColor: string
	displayName: string
	favouriteTracks: ITrack[] | null
	myPlaylists: IPlaylist[] | null
	favouritePlaylists: IPlaylist[] | null
	favouriteAlbums: IAlbum[] | null
}
