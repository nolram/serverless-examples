// src/routes.ts

import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/email', (request: Request, response: Response) => {
    response.json(request.body);
});

export default router;
