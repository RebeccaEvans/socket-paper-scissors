console.log('Hello Front End')
const socket = io()

let btn
let login
let username

document.addEventListener('DOMContentLoaded', () => {
	btn = document.getElementById('btn').addEventListener('click', submitLogin)
	login = document.getElementById('login')
	username = document.getElementById('username')
})

const submitLogin = () => {
	console.log('Wassup')

	
}

socket.on('get players', data => {
	console.log(data)
})