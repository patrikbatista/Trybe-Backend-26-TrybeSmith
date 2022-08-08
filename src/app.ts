import express from 'express';
import 'express-async-errors';

import routes from './routes';
import error from './middlewares/error';

const app = express();

app.use(express.json());

app.use(routes.product);
app.use(routes.user);
app.use(routes.order);
app.use(routes.login);
app.use(error);
export default app;
