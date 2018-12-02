import logger from 'morgan';
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import swagger from 'swagger-ui-express';
import YAML from 'yamljs';
import ordersRoutes from './Api/routes/index';
import usersRoutes from './Api/routes/usersRoute';

dotenv.config();

const apiDocs = YAML.load('./apiDocs.yaml');
// port declaration
const PORT = process.env.PORT || process.env.SV_PORT;

// Set up the express app
const app = express();

// instanciate imported middlewares
app.use(logger('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Parse incoming requests data
app.use(express.static('client/public'));
app.use('/api/v1/docs', swagger.serve, swagger.setup(apiDocs));
app.use('/api/v1', ordersRoutes);
app.use('/api/v1', usersRoutes);

app.get('/', (req, res) => res.status(404).send({
  status: 'connection successful',
  message: 'Welcome to SendIT!',
}));

app.use('*', (req, res) => res.status(404).send({
  status: 'error',
  error: '404',
  message: `Route  ${req.params} does not exist. You may navigate to the home route at api/v1`,
}));


app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
export default app;
