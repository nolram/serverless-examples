import express from 'express';
import * as bodyParser from 'body-parser';

import routes from './routes';
import userRoute from './app/route/user.route';
import transactionRoute from './app/route/transaction.route';
import errorMiddleware from './app/middleware/error.middleware';

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.middleware();
        this.routes();
        this.errorHandling();
    }
    private middleware(): void {
        this.app.use(bodyParser.json({ strict: false }));
    }

    private errorHandling(): void{
        //middleware
        this.app.use(errorMiddleware);
    }

    private routes(): void{
        //routes
        this.app.use('/', routes);
        this.app.use('/users', userRoute);
        this.app.use('/transactions', transactionRoute);
    }
}

export default new App().app;
