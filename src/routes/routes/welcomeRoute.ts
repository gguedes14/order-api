import { Router } from 'express';

const createRouter = Router();

createRouter.get('/welcome', (req, res) => {
    return res.json({ message: 'Welcome!' });
});

export default createRouter;
