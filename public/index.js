const socket = io('http://localhost:3000')
const $form = document.querySelector('#chat')
const $messageBox = document.querySelector('.messages')

const renderMessage = (message) => {
  const containerMessage = document.createElement('div')
  containerMessage.classList.add('message')
  containerMessage.innerHTML = `<strong>${message.author}</strong>: ${message.message}`

  $messageBox.appendChild(containerMessage)
}

socket.on('receivedMessage', function(message){
  renderMessage(message)
})

socket.on('previusMessages', (messageList) => {
  messageList.forEach(renderMessage)
})

$form.addEventListener('submit', (e) => {
  e.preventDefault()

  const $inputName = document.querySelector('.user-name-field')
  const $inputMessage = document.querySelector('.message-field')

  const author = $inputName.value 
  const message = $inputMessage.value 

  if (author && message) {
    const messageObject = {
      author,
      message
    }

    renderMessage(messageObject)

    socket.emit('sendMessage', messageObject)
  }
})