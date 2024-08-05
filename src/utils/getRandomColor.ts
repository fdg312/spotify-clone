export function getRandomColor() {
	const l = '0123456789ABCDEF'
	let col = '#'
	for (let i = 0; i < 6; i++) {
		col += l[Math.floor(Math.random() * 16)]
	}
	return col
}
