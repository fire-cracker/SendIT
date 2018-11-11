import logger from 'morgan'
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import ordersRoutes from './Api/routes/index.js';
import usersRoutes from './Api/routes/usersRoute';

dotenv.config();

//port declaration
const PORT = process.env.PORT || process.env.SV_PORT;

// Set up the express app
const app = express()

//instanciate imported middlewares
app.use(logger('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Parse incoming requests data
app.use('/api/v1', ordersRoutes);
app.use('/api/v1', usersRoutes);

app.get('/api/v1', (req, res) => {
  return res.status(404).send({
    status: "connection successful",
    message: 'Welcome to SendIT!'
  });
});

app.use('*', (req, res) => {
  return res.status(404).send({
    status: "success",
    error: "404",
    message: ` Route  ${req.params} does not exist. You may navigate to the home route at api/v1`
  })
});



app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});
export default app;