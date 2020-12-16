import app from './app';

import * as serverless from 'serverless-http';
// import { APIGatewayProxyHandler } from 'aws-lambda';

export const handler = serverless(app);

// module.exports.handler = serverless(app);
// const PORT = 3000;

// app.listen(PORT, () => {
//     console.log(`Express server listening on port ${PORT}`);
// });
