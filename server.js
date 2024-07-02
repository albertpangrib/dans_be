const Express = require('express');
const BodyParser = require('body-parser');
const App = Express();
const Path = require('path');
const { sequelize } = require('./server/models');
require('dotenv').config({ path: Path.join(__dirname, 'api.env') })

const Logger = require('./server/helpers/Logger');
const Cors = require('./server/middlewares/Cors');
const TransactionId = require('./server/middlewares/TransactionId')

const AuthRoute = require('./server/routes/AuthRoute');
const UserRoute = require('./server/routes/UserRoute');
const DansRoute = require('./server/routes/DansRoute');

const PORT = process.env.APP_PORT;
const API_PATH = process.env.API_PATH;
const BASE_PATH = API_PATH ? `/${API_PATH}`:'';
const BASE_URL = `localhost:${PORT}${BASE_PATH}`;

(async () => {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
      
      await sequelize.sync();
      
      App.listen(PORT, () => {
        console.log(`Server running at http://${BASE_URL}`);
      });
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  })();

App.use(TransactionId);
App.use(Cors);

App.use(Express.json());

App.use(BodyParser.urlencoded({ limit: '50mb', extended: true }));
App.use(BodyParser.json({limit: '50mb'}));

App.get(`${BASE_PATH}`, (req, res) => {
    res.send('Hello World');
});

App.use(`${BASE_PATH}/auth`, AuthRoute);
App.use(`${BASE_PATH}/user`, UserRoute);
App.use(`${BASE_PATH}/dans`, DansRoute);
