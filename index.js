const { Socket } = require('dgram')
const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 9001;

const server = require('http').createServer(app)
const io = require('socket.io')(server)

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'public'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.use('/', (req, res) => {
  res.render('index.html')
})

const messageList = []

io.on('connection', socket => {
  console.log(`socket conectado: ${socket.id}`)

  socket.emit('previusMessages', messageList)

  socket.on(`sendMessage`, data => {
    messageList.push(data)
    socket.broadcast.emit('receivedMessage', data)
  })
})

server.listen(PORT)