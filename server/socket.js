const { Server } = require('socket.io');

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
    },
  });

  io.on('connection', (socket) => {
  // eslint-disable-next-line no-console
  console.log('a user connected');

    socket.on('JoinRoom', (room) => {
      socket.join(room);
      // eslint-disable-next-line no-console
      console.log('user joined room:', room);
    })

    socket.on('sendMessage', (room, message) => { 
      // eslint-disable-next-line no-console
      console.log(`New message in room ${room}:`, message);
      io.to(room).emit('receiveMessage', message);
    });

    socket.on('DeleteConversation', (conversationId) => {
      // eslint-disable-next-line no-console
      console.log('deleting conversation:', conversationId);
      io.emit('DeleteConversation', conversationId);
    });

    socket.on('addConversation', (userRoom, contactRoom, conversation) => {
      // eslint-disable-next-line no-console
      console.log('adding conversation:', conversation);
      io.to(userRoom).emit('addConversation', conversation);
      io.to(contactRoom).emit('addConversation', conversation);
    });

    socket.on('DeleteContact', (room, data) => { 
      // eslint-disable-next-line no-console
      console.log('deleting contact:', data);
      io.to(room).emit('DeleteContact', data);
    });

    socket.on('AcceptContactRequest', (room, data) => { 
      // eslint-disable-next-line no-console
      console.log('accepting contact request:', data);
      io.to(room).emit('AcceptContactRequest', data);
    });

    socket.on('RejectContactRequest', (room, data) => {
      // eslint-disable-next-line no-console
      console.log('rejecting contact request:', data);
      io.to(room).emit('RejectContactRequest', data);
    });

    socket.on('UpdatePendingContacts', (room, data) => { // Change to SendContactRequest
      // eslint-disable-next-line no-console
      console.log('updating pending contacts:', data);
      io.to(room).emit('UpdatePendingContacts', data);
    });

    socket.on('ChangeUserStatus', (user) => { 
      // eslint-disable-next-line no-console
      console.log('changing user status:', user); // only update user status when user logs in
      io.emit('ChangeUserStatus', user);
    });

    socket.on('disconnect', () => {
      // eslint-disable-next-line no-console
      console.log('user disconnected');
    });
  });
  
  return io;

}

module.exports = initializeSocket;