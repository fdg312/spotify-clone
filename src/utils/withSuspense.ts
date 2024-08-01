type Status = 'pending' | 'success' | 'error'

export function withSuspense<T, A extends unknown[]>(
	fn: (...args: A) => Promise<T>
) {
	return function (...args: A): () => T {
		let status: Status = 'pending'
		let response: T | Error

		const suspender = fn(...args).then(
			(res: T) => {
				status = 'success'
				response = res
			},
			(err: Error) => {
				status = 'error'
				response = err
			}
		)

		return (): T => {
			switch (status) {
				case 'pending':
					throw suspender
				case 'error':
					throw response
				default:
					return response as T
			}
		}
	}
}
