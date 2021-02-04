// src/routes.ts

import express, { Request, Response } from 'express';

import { UserRepository } from './app/services/users/UserRepository';

import { User } from './domain/entities/users';

const router = express.Router();

router.get('/hello', (request: Request, response: Response) => {
    response.json({
        status: 'success',
        data: 'Hello World!!'
    });
});

router.post('/users', (request: Request, response: Response) => {
    const { type, name, birthday } = request.body;
    if (typeof type !== 'string') {
        response.status(400).json({ error: '"type" must be a string' });
    } else if (typeof name !== 'string') {
        response.status(400).json({ error: '"name" must be a string' });
    }
    const userRepository: UserRepository = new UserRepository();

    const promise: Promise<any> = userRepository.createUser(
        name,
        type,
        birthday
    );

    promise
        .then((data) => {
            response.status(200).json(data);
        })
        .catch((err: string) => {
            console.error(err);
        });
});

router.get('/users', (request: Request, response: Response) => {
    const userRepository: UserRepository = new UserRepository();
    const promise = userRepository.getUsers();
    promise
        .then((data) => {
            const users: User[] = [];
            data.Items.forEach((element) => {
                const user: User = {
                    userId: element.userId,
                    name: element.name,
                    type: element.type,
                    birthday: element.birthday
                };
                users.push(user);
            });
            response.status(200).json(users);
        })
        .catch((err: string) => {
            console.error(err);
        });
});

export default router;
