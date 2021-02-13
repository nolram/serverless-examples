import Transaction, { ITransactionEntity } from '../domain/entities/transaction';

import { v1 } from 'uuid';

export class TransactionRepository {

    public getAllTransactions(): Promise<any> {
        const promise = Transaction.query('TRANSACTION', {
            limit: 100,
            capacity: 'indexes',
            index: 'gsi_1'
        })
        return promise;
    }

    public getTransactionsByUser(userId: string): Promise<any>{
        console.log(userId);
        const promise = Transaction.query(userId, {
            eq: 'TRANSACTION',
            capacity: 'indexes'
        })
        return promise;
    }

    public addTransaction(transactionData: ITransactionEntity): Promise<any> {
        transactionData.identifier = v1();
        const promise = Transaction.put(transactionData);
        return promise;
    }
}
