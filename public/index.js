const socket = io();

const list = document.querySelector('#messageList');
const listAnchor = document.querySelector('#messageList > .anchor');
const textInput = document.querySelector('#textIn');

function addMsgToList(x) {
  const el = document.createElement('li');

  el.innerHTML = x;
  list.insertBefore(el, listAnchor);
}

document.querySelector('#send').addEventListener('click', (e) => {
  e.preventDefault();

  const text = textInput.value;
  console.log(`Sending "${text}"`);

  // We send an event of type 'message' with `text` as the content.
  // The type ('message') is an arbitrary event name. It must match with
  //  an event type name the server listens for.
  socket.emit('message', text);
});

// The client also listens for 'message' type events, and responds
//  by adding the payload to the HTML list.
socket.on('message', (text) => addMsgToList(text));
