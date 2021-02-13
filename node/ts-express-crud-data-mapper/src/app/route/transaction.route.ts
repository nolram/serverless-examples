import express, { Request, Response, Router } from 'express';
import TransactionDTO from '../domain/dto/transaction.dto';
import { ITransactionEntity } from '../domain/entities/transaction';
import validationMiddleware from '../middleware/validation.middleware';

import { TransactionRepository } from "../repository/transaction.repository";

class TransactionRoute{
    public router: Router;

    constructor(){
        this.router = express.Router();

        this.router.post('/', validationMiddleware(TransactionDTO), this.addTransaction);
        this.router.get('/', this.getAllTransactions);
        this.router.get('/:id', this.getTransactionByUser);
    }

    private addTransaction(request: Request, response: Response, next: express.NextFunction){
        const transactionRepository = new TransactionRepository();

        const postData: ITransactionEntity = request.body;

        transactionRepository.addTransaction(postData)
            .then((data) => {
                response.status(200).json(data);
            })
            .catch((err: string) => {
                console.error(err);
            });
    }
    private getAllTransactions(request: Request, response: Response, next: express.NextFunction){
        const transactionRepository = new TransactionRepository();

        transactionRepository.getAllTransactions()
            .then((data) => {
                response.status(200).json(data);
            })
            .catch((err: string) => {
                console.error(err);
            });
    }

    private getTransactionByUser(request: Request, response: Response, next: express.NextFunction){
        const transactionRepository = new TransactionRepository();

        transactionRepository.getTransactionsByUser(request.params.id)
            .then((data) => {
                response.status(200).json(data);
            })
            .catch((err: string) => {
                console.error(err);
            });
    }
}

export default new TransactionRoute().router;