import { Table } from 'dynamodb-toolbox';
import DynamoDbDocumentClient  from '../../infra/database/dynamodb';


class CrudTableClass {

    public crudTable: Table;

    constructor(){
        this.crudTable = new Table({
            // Specify table name (used by DynamoDB)
            name: process.env.CRUD_TABLE,
            // Define partition and sort keys
            partitionKey: 'pk',
            sortKey: 'sk',
            // indexes
            indexes: {
                gsi_1: { partitionKey: 'sk', sortKey: 'data' },
            },
            // Add the DocumentClient
            DocumentClient: DynamoDbDocumentClient
        });
    }
    
}

export default new CrudTableClass().crudTable;