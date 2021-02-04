// src/routes.ts

import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/hello', (request: Request, response: Response) => {
    response.json({
        status: 'success',
        data: 'Hello World!!'
    });
});

export default router;
