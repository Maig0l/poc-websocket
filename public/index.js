const socket = io();

const list = document.querySelector('#messageList');
const listAnchor = document.querySelector('#messageList > .anchor');
const textInput = document.querySelector('#textIn');
const sendBtn = document.querySelector('#send');

function addMsgToList(x) {
  const el = document.createElement('li');

  el.innerHTML = x;
  list.insertBefore(el, listAnchor);
}

sendBtn.addEventListener('mousedown', (e) => {
  e.preventDefault();
});

sendBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const text = textInput.value;
  console.log(`Sending "${text}"`);
  textInput.value = '';

  // We send an event of type 'message' with `text` as the content.
  // The type ('message') is an arbitrary event name. It must match with
  //  an event type name the server listens for.
  socket.emit('message', text);
});

// The client also listens for 'message' type events, and responds
//  by adding the payload to the HTML list.
socket.on('message', (text) => addMsgToList(text));

list.addEventListener('overflow', function scrollAnchorTriggerer(ev) {
  list.scroll(0, list.scrollHeight);

  // Due to the way scroll anchoring works, we want JS to scroll to the bottom
  // (where the anchor is) only once. We don't need this event listener anymore
  // https://css-tricks.com/books/greatest-css-tricks/pin-scrolling-to-bottom/
  list.removeEventListener('overflow', scrollAnchorTriggerer);
});
