import { Entity } from 'dynamodb-toolbox';

import CrudTable  from "../tables/crud.table";

export interface IUserEntity {
    pk?: string;
    sk?: string;
    identifier: string;
    name: string;
    birthday: string;
    accountType: string;
    email: string;
    phone: string;
    active?: boolean;
    // created?: string;
    // modified?: string;
}

class User{
    public userEntity: Entity<IUserEntity>;

    constructor(){
        this.userEntity = new Entity<IUserEntity>({
            name: 'User',
            timestamps: true,
            attributes: {
                // index
                pk: { 
                    partitionKey: true,
                    default: (data: IUserEntity) => `USER#${data.identifier}`,
                },
                sk: {
                    sortKey: true,
                    hidden: true,
                    default: () => 'USER'
                },
                // gsi1"
                // gsi1_pk: {
                //     hidden: true,
                //     default: (data: IUserEntity) => `USER#${data.identifier}`,
                // },
                // gsi1_sk: {
                //     hidden: true,
                //     default: 'USER',
                // },

                // attributes
                identifier: 'string',
                data: { type: 'string', alias: 'name' },
                // name: 'string',
                birthday: 'string',
                email: 'string',
                phone: 'string',
                accountType: 'string',
                active: {
                    type: 'boolean',
                    default: true
                }
            },
            table: CrudTable
        });
    }
}


export default new User().userEntity;