import { DynamoDB } from 'aws-sdk';

export class DynamoDbConnection {
    private dynamodb: DynamoDB.DocumentClient;

    constructor() {
        if (process.env.IS_OFFLINE === 'true') {
            this.dynamodb = new DynamoDB.DocumentClient({
                region: 'localhost',
                endpoint: 'http://localhost:8000',
                apiVersion: '2012-08-10'
            });
        } else {
            this.dynamodb = new DynamoDB.DocumentClient({
                apiVersion: '2012-08-10'
            });
        }
    }

    public async insertItem(tableName: string, item: any): Promise<any> {
        const params: DynamoDB.DocumentClient.PutItemInput = {
            TableName: tableName,
            Item: item
        };
        const result = this.dynamodb.put(params).promise();
        return result;
    }

    public async getItems(tableName: string, fields: string): Promise<any> {
        const params: DynamoDB.DocumentClient.ScanInput = {
            TableName: tableName,
            ProjectionExpression: fields,
            ExpressionAttributeNames: { '#name': 'name', '#type': 'type' }
        };
        const result = await this.dynamodb.scan(params).promise();
        return result;
    }
}
