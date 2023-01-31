import { createClient } from 'redis';

const Client = createClient({
  socket: {
    host: 'localhost',
    port: 3002,
  },
});

Client.on('error', (err) => console.error(err));
Client.connect();

export { Client };
