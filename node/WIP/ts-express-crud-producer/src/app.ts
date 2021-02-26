import express from 'express';
import * as bodyParser from 'body-parser';

import routes from './routes';

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.middleware();
    }
    private middleware(): void {
        this.app.use(bodyParser.json({ strict: false }));
        this.app.use(routes);
    }
}

export default new App().app;
