import { DynamoDB } from 'aws-sdk';

class DynamoDbConnection {
    public dynamodb: DynamoDB.DocumentClient;

    constructor() {
        if (process.env.IS_OFFLINE === 'true') {
            this.dynamodb = new DynamoDB.DocumentClient({
                endpoint: 'http://localhost:8000'
            });
        } else {
            this.dynamodb = new DynamoDB.DocumentClient({
                apiVersion: '2012-08-10'
            });
        }
    }

    public getDocumentClient(): DynamoDB.DocumentClient {
        return this.dynamodb;
    }
}

export default new DynamoDbConnection().dynamodb;