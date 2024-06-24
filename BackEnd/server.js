import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import todoRoutes from './routes/todoRoute.js';
import noteRoutes from './routes/noteRoute.js';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import products from './routes/productRouter.js';
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http';

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT ;


connectDB();

app.use('/api/users', userRoutes);
app.use('/api/todos', todoRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/products', products);

// Socket.IO bağlantısını dinleme
io.on('connection', (socket) => {
  console.log('Yeni bir kullanıcı bağlandı');

  socket.on('chat message', (msg) => {
    console.log('Mesaj alındı: ' + msg);
    // Mesajı tüm istemcilere gönder
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('Kullanıcı ayrıldı');
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

io.listen(server);

