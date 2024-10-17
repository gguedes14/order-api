import { Router } from 'express';
import welcomeRoute from '../routes/welcomeRoute';

const routes = Router();

routes.use('/welcome', welcomeRoute);


export default routes;
