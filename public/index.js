const socket = io();
const list = document.querySelector('#messageList');
const userCount = document.querySelector('#userCount');

function addMsgToList(x) {
  const el = document.createElement('li');

  el.innerHTML = x;
  list.appendChild(el);
}

// document.querySelector('#send').addEventListener('click', () => {
//   const text = document.querySelector('#textIn').value;
//   console.log(`Sending "${text}"`);

//   // We send an event of type 'message' with `text` as the content.
//   // The type ('message') is an arbitrary event name. It must match with
//   //  an event type name the server listens for.
//   socket.emit('message', text);
// });

// The client also listens for 'message' type events, and responds
//  by adding the payload to the HTML list.
socket.on('time', (tstamp) => addMsgToList(tstamp));
socket.on('userCount', (count) => {
  userCount.innerHTML = count;
});
