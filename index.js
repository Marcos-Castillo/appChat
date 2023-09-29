const WebSocket = require('ws');
const http = require('http');

const server = http.createServer((req, res) => {
  // Puedes manejar solicitudes HTTP aquí si es necesario.
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('Cliente conectado');
  
    ws.on('message', (message) => {
      const messageData = JSON.parse(message);
      console.log(`Mensaje recibido de ${messageData.sender}: ${messageData.message}`);
  
      // Agregar la hora al mensaje antes de reenviarlo
      const now = new Date();
      const formattedTime = now.toLocaleTimeString();
      messageData.time = formattedTime;
  
      // Reenviar el mensaje a todos los clientes conectados
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(messageData));
        }
      });
    });
  
    ws.on('close', () => {
      console.log('Cliente desconectado');
    });
  });
  

server.listen(3000, () => {
  console.log('Servidor WebSocket en ejecución en el puerto 3000');
});
