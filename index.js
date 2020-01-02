const express = require('express')
const app = express()
const server = require ('http').createServer(app)
const io = require('socket.io').listen(server)
const layout = require('express-ejs-layouts')

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(layout)

//Socket Variables
let connections = []
let players = []

//Socket Fun
io.sockets.on('connection', socket => {
	connections.push(socket)
	console.log(`Connection Made: ${connections.length} sockets connected`)

	socket.on('disconnect', data => {
		players.splice(players.indexOf(socket.username), 1)
		updateUsernames();
		console.log(data)
		connections.splice(connections.indexOf(socket), 1)
		io.emit('disconneted', socket.username)
		console.log(`Disconnected: ${connections.length} sockets connected`)
	})

	const updateUsernames = () => {
		io.sockets.emit('get players', players)
	}

})

app.get('/', (req, res) => {
	res.render('index')
})


server.listen(3000, () => {
	console.log('Keeping it 3000')
})