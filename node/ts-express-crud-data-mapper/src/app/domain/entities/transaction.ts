import { Entity } from 'dynamodb-toolbox';

import CrudTable  from "../tables/crud.table";

export interface ITransactionEntity {
    identifier: string;
    userId: string;
    value: number;
    transactionType: string;
    created?: string;
    modified?: string;
}

class Transaction{
    public transactionEntity: Entity<ITransactionEntity>;

    constructor(){
        this.transactionEntity = new Entity<ITransactionEntity>({
            name: 'Transaction',
            timestamps: true,
            attributes: {
                // index
                pk: { 
                    partitionKey: true,
                },
                userId: ['pk', 0],
                sk: {
                    sortKey: true,
                    hidden: true,
                    default: () => `TRANSACTION`,
                },
                // // gsi1"
                // gsi1_pk: {
                //     hidden: true,
                //     default: (data: ITransactionEntity) => `${data.userId}`,
                // },
                // gsi1_sk: {
                //     hidden: true,
                //     default: 'TRANSACTION',
                // },
                // attributes
                identifier: 'string',
                // value: 'number',
                data: { alias: 'value', type: 'string' },
                transType: { type: 'string', alias: 'transactionType'},
            },
            table: CrudTable
        });
    }
}


export default new Transaction().transactionEntity;