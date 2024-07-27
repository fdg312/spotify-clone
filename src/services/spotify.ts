import Cookies from 'js-cookie'

export const SpotifyService = {
	async getAccessToken() {
		const result = await fetch('https://accounts.spotify.com/api/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization:
					'Basic ' +
					btoa(
						import.meta.env.VITE_SPOTIFY_CLIENTID +
							':' +
							import.meta.env.VITE_SPOTIFY_CLIENTSECRET
					),
			},
			body: 'grant_type=client_credentials',
		})

		const data = await result.json()

		Cookies.set('spotify_access_token', data.access_token)
	},

	async getGenres() {
		if (!Cookies.get('spotify_access_token')) {
			await SpotifyService.getAccessToken()
		}

		const result = await fetch(
			'https://api.spotify.com/v1/recommendations/available-genre-seeds',
			{
				method: 'GET',
				headers: {
					Authorization: 'Bearer ' + Cookies.get('spotify_access_token'),
				},
			}
		)

		const data = await result.json()

		return data
	},
}
