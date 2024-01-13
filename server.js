const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')
const colors = require('colors')
const path = require('path')
const connectDb = require('./config/connectDb')
const { createProxyMiddleware } = require('http-proxy-middleware');


//config dot env file
dotenv.config();

//call db
connectDb()

//rest object
const app = express()

//middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

//routes
/*app.use(
  '/api/v1',
  createProxyMiddleware({
    target: 'http://localhost:8080',
    changeOrigin: true,
  })
);*/


//app.use('/api/v1/users', require('./routes/userRoute'));
//user routes
const userRouter = require('./routes/userRoute')
app.use('/api/v1/users', userRouter);

//transaction routes
const transactionRouter = require('./routes/transactionRoutes')
app.use('/api/v1/transactions',transactionRouter)

//static files
app.use(express.static(path.join(__dirname, '/client/build')))
app.get('*', function(req, res){
  res.sendFile(path.join(__dirname, './client/build/index.html'))
})

//port
const PORT = 8080 || process.env.PORT

//listen server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})