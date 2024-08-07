import { Models } from 'appwrite'
import { IAlbum } from './Album'
import { IPlaylist } from './Playlist'
import { ITrack } from './Track'

export interface IAccount extends Models.Document {
	userId: string
	avatarColor: string
	favouriteTracks: ITrack[] | null
	myPlaylists: IPlaylist[]
	favouritePlaylists: IPlaylist[]
	favouriteAlbums: IAlbum[]
}
