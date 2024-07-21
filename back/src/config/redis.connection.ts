import { createClient } from 'redis';
import { config as dotenvConfig } from 'dotenv';
dotenvConfig({ path: '.env' });

const Client = createClient({
  socket: {
    host: `${process.env.REDIS_HOST}`,
    port: Number(`${process.env.REDIS_PORT}`),
  },
});

Client.on('error', (err) => console.error(err));
Client.connect();

export { Client };
