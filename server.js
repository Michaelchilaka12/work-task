const mongoose = require('mongoose');
const dotenv = require('dotenv');


dotenv.config({ path: './.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace('<db_password>',process.env.DATABASE_PASSWORD);
mongoose
  .connect(DB, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'));


  const Port = process.env.PORT || 3000;
app.listen(Port, ()=>{
    console.log(`server runing on port ${Port}`);
    
})