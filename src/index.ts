import express, { NextFunction, Request, Response } from 'express';
import routes from './routes/http/routes';
import ApiError from './enum/ApiError';

const app = express();

app.use(express.json());

app.use(routes);

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof ApiError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.info('Server started on port 3000 🚀');
});
