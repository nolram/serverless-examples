import express, { Request, Response, Router } from 'express';
import UserNotFoundException from '../exceptions/usernotfound.exception';

import { UserRepository } from '../repository/user.repository';
import { IUserEntity } from '../domain/entities/user';
import UserDTO from '../domain/dto/user.dto';
import validationMiddleware from '../middleware/validation.middleware';

class UserRoute{

    public router: Router;

    constructor() {
        this.router = express.Router();

        this.router.post('/', validationMiddleware(UserDTO), this.createUser);
        this.router.get('/', this.getAllUsers);
        this.router.get('/:pk', this.getUserById);
    }

    private createUser(request: Request, response: Response, next: express.NextFunction){
        const userRepository = new UserRepository(); 
        const postData: IUserEntity = request.body;
        userRepository.createUser(postData)
        .then((data) => {
            response.status(200).json(data);
        })
        .catch((err: string) => {
            console.error(err);
        });
    }

    private getAllUsers(request: Request, response: Response, next: express.NextFunction){
        const userRepository = new UserRepository(); 
        userRepository.getUsers()
            .then((data) => {
                // const users: User[] = [];
                // data.Items.forEach((element) => {
                //     const user: User = {
                //         userId: element.userId,
                //         name: element.name,
                //         type: element.type,
                //         birthday: element.birthday
                //     };
                //     users.push(user);
                // });
                response.status(200).json(data);
            })
            .catch((err: string) => {
                console.error(err);
            });
    }

    private getUserById(request: Request, response: Response, next: express.NextFunction){
        const userRepository = new UserRepository(); 
        const pk = request.params.pk;
        userRepository.getUser(pk)
        .then((data) => {
            if(Object.keys(data).length > 0){
                response.status(200).json(data);
            }else{
                next(new UserNotFoundException(pk))
            }
        })
        .catch((err: string) => {
            console.error(err);
        });
    }
}

export default new UserRoute().router;