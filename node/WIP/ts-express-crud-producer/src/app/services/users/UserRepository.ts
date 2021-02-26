import { User } from '../../../domain/entities/users';
import { AccountTypes } from '../../../domain/enum/types';

import { v1 } from 'uuid';

import { DynamoDbConnection } from '../../../infra/database/DynamoDB';
import { EventBridgeConnection } from '../../../infra/event/EventBridge';

export class UserRepository {
    private USERS_TABLE: string = process.env.USERS_TABLE;
    private dynamoDb: DynamoDbConnection;

    constructor() {
        this.dynamoDb = new DynamoDbConnection();
    }

    public getUsers(): Promise<any> {
        const promise = this.dynamoDb.getItems(
            this.USERS_TABLE,
            'userId, #name, birthday, #type'
        );
        return promise;
    }

    public async createUser(
        name: string,
        type: string,
        birthday?: Date
    ): Promise<any> {
        const accountType = this.getType(type);
        const user: User = {
            userId: v1(),
            name: name,
            type: accountType,
            birthday: birthday
        };
        const promise = await this.dynamoDb.insertItem(this.USERS_TABLE, user);
        await this.notifyPrimeAccount(user);
        return promise;
    }

    private async notifyPrimeAccount(user: User){
        if(user.type === AccountTypes.BLACK || user.type === AccountTypes.PLATINUM){
            const ev = new EventBridgeConnection();
            const promise = ev.putEvent(process.env.EVENT_BUSNAME, process.env.EVENT_SOURCE, 'PrimeAccountCreation', JSON.stringify(user));
            promise.then((data) => {
                console.log(data);
            }).catch((err) => {
                console.error(err);
            })
        }
    }

    private getType(type: string): AccountTypes {
        switch (type) {
            case 'gold':
                return AccountTypes.GOLD;
            case 'black':
                return AccountTypes.BLACK;
            case 'platinum':
                return AccountTypes.PLATINUM;
            default:
                return AccountTypes.BASIC;
        }
    }
}
