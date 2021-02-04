import app from './app';

import * as serverless from 'serverless-http';

export const handler = serverless(app);

