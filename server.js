const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Inicializar servidor
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Sirve el frontend estático
app.use(express.static('public'));

// Maneja conexión de clientes
io.on('connection', (socket) => {
  console.log('Nuevo usuario conectado');

  // Mensaje de chat
  socket.on('chatMessage', (msg) => {
    console.log(msg)
    io.emit('chatMessage', msg);
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
  });
});
// Escuchar en el puerto 3000
server.listen(3000, () => {
  console.log('Servidor escuchando en http://localhost:3000');
});
