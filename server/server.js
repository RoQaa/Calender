const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: `${__dirname}/config.env` });


const app = require(`${__dirname}/app`);



const DB = process.env.DATABASE.replace('<password>',process.env.PASSWORD)
mongoose.set("strictQuery", false);
mongoose
  .connect(DB)
  .then((con) => {
    console.log('DB connection Successfully');
  });



const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
const io=require('./utils/socket').init(server);
io.on('connection', (socket) => {
  console.log('Socket is connected!');
})

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
