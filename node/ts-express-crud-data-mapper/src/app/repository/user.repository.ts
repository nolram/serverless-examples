import User, { IUserEntity } from '../domain/entities/user';
// import UserDTO  from '../domain/dto/user.dto'

import { v1 } from 'uuid';
import { String } from 'aws-sdk/clients/dynamodb';

export class UserRepository {

    public getUsers(): Promise<any> {
        const promise = User.query('USER', {
            limit: 10,
            capacity: 'indexes',
            index: 'gsi_1'
        })
        return promise;
    }

    public getUser(pk: String): Promise<any> {
        const promise = User.get({
            pk: pk,
            sk: 'USER'
        });
        return promise;
    }

    public createUser(userData: IUserEntity): Promise<any> {
        userData.identifier = v1();
        const promise = User.put(userData);
        return promise;
    }

}
