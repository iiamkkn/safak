const express = require('express');
const app = express();
// const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const cookieParser = require('cookie-parser');
const cloudinary = require('cloudinary');
const bodyParser = require('body-parser');

// imported Routes

// const authRoute = require('./routes/auth');
// const userRoute = require('./routes/users');
const productRouter = require('./routes/productRoutes');
const uploadRouter = require('./routes/uploadRoutes');
const seedRouter = require('./routes/seedRoutes');
const { passRoutes } = require('./routes/passRoutes');
const VerifyRouter = require('./routes/accountVerifyRoutes');
const PaymentRouter = require('./routes/paymentRoute');
const { orderRouter } = require('./routes/orderRoutes');
const userRouter = require('./routes/userRoutes');

const connectDB = require('./config/dbConn');
connectDB();

dotenv.config();

// mongoose
//   .connect(process.env.MONGODB_URL, {})
//   .then(() => console.log('DB Connection Successfull'))
//   .catch((err) => {
//     console.error(err);
//   });

app.use(cors());
app.use(cookieParser());
app.use(express.json());
// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// Routes Starts
//

// app.use('/api/auth', authRoute);
// app.use('/api/users', userRoute);

app.use('/api/products', productRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/seed', seedRouter);
app.use('/api/users', userRouter);
app.use('/api/pass', passRoutes);
app.use('/api/account', VerifyRouter);
app.use('/api/orders', orderRouter);
app.use('/api', PaymentRouter);
// Routes Ends

// cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// CONNECT to PayPal API
app.get('/api/keys/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});

// Google Choose Map API
app.get('/api/keys/google', (req, res) => {
  res.send({ key: process.env.GOOGLE_API_KEY || 'Maps' });
});

// to serve images inside public folder
app.use(express.static('public'));
app.use('/images', express.static('images'));

// http and socket.io
const httpServer = http.Server(app);
const io = new Server(httpServer, { cors: { origin: '*' } });
const users = [];

io.on('connection', (socket) => {
  // console.log('connection', socket.id);
  socket.on('disconnect', () => {
    const user = users.find((x) => x.socketId === socket.id);
    if (user) {
      user.online = false;
      // console.log('Offline', user.name);
      const admin = users.find((x) => x.isAdmin && x.online);
      if (admin) {
        io.to(admin.socketId).emit('updateUser', user);
      }
    }
  });
  socket.on('onLogin', (user) => {
    const updatedUser = {
      ...user,
      online: true,
      socketId: socket.id,
      messages: [],
    };
    const existUser = users.find((x) => x._id === updatedUser._id);
    if (existUser) {
      existUser.socketId = socket.id;
      existUser.online = true;
    } else {
      users.push(updatedUser);
    }
    // console.log('Online', user.name);
    const admin = users.find((x) => x.isAdmin && x.online);
    if (admin) {
      io.to(admin.socketId).emit('updateUser', updatedUser);
    }
    if (updatedUser.isAdmin) {
      io.to(updatedUser.socketId).emit('listUsers', users);
    }
  });

  socket.on('onUserSelected', (user) => {
    const admin = users.find((x) => x.isAdmin && x.online);
    if (admin) {
      const existUser = users.find((x) => x._id === user._id);
      io.to(admin.socketId).emit('selectUser', existUser);
    }
  });

  socket.on('onMessage', (message) => {
    if (message.isAdmin) {
      const user = users.find((x) => x._id === message._id && x.online);
      if (user) {
        io.to(user.socketId).emit('message', message);
        user.messages.push(message);
      }
    } else {
      const admin = users.find((x) => x.isAdmin && x.online);
      if (admin) {
        io.to(admin.socketId).emit('message', message);
        const user = users.find((x) => x._id === message._id && x.online);
        user.messages.push(message);
      } else {
        io.to(socket.id).emit('message', {
          name: 'Support',
          body: 'We will reply to you as soon as our support team gets online.',
        });
      }
    }
  });
});

// app.listen(8800, () => {
//   console.log('Backend server is running!');
// });

// Port Config
const port = process.env.PORT || 5000;
// Server config
httpServer.listen(6000, () => {
  console.log(`Server Runs Successfully at http://localhost:${port}`);
});
