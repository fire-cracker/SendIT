import logger from 'morgan'
import express from 'express';
import bodyParser from 'body-parser';
import ordersRoutes from './Api/routes/index.js';



// Set up the express app
const app = express()
// Parse incoming requests data
app.use(logger('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/v1', ordersRoutes);

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

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});
export default app;