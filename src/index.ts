import fastify from 'fastify';
import socketioServer from 'fastify-socket.io';
import type { Server } from "socket.io";

declare module 'fastify' {
  interface FastifyInstance {
    io: Server<{ hello: string }>
  }
}

const app = await fastify({ logger: true });

app.register(socketioServer);

app.get('/', (_req, reply) => {
  reply.send('Hello');
});

app.ready((err) => {
  if (err) throw err;

  app.io.on('connection', (socket) =>
    console.info('Socket connected!', socket.id),
  );
});

app.listen({ port: 3000 });
