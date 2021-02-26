import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'my-express-application',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    },
    tableName: '${self:provider.stage}-crud-table',
    region: 'us-east-1',
    dynamodb: {
      stages: ['dev'],
      start: {
        migrate: true
      }
    }
  },
  // Add the serverless-webpack plugin
  plugins: ['serverless-webpack', 'serverless-dynamodb-local', 'serverless-offline'],
  // plugins: ['serverless-webpack', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    profile: 'devops-southsystem',
    region: 'us-east-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      CRUD_TABLE: '${self:custom.tableName}'
    }
  },
  functions: {
    app: {
      handler: 'src/server.handler',
      memorySize: 128,
      events: [
        {
          http: {
            method: 'get',
            path: 'hello',
          }
        }
      ]
    },
    getUsers: {
      handler: 'src/server.handler',
      memorySize: 128,
      events: [
        {
          http: {
            method: 'get',
            path: '/users',
          }
        }
      ]
    },
    getUser: {
      handler: 'src/server.handler',
      memorySize: 128,
      events: [
        {
          http: {
            method: 'get',
            path: '/users/{pk}',
          }
        }
      ]
    },
    createUser: {
      handler: 'src/server.handler',
      memorySize: 128,
      events: [
        {
          http: {
            method: 'post',
            path: '/users',
          }
        }
      ]
    },
    getAllTransactions: {
      handler: 'src/server.handler',
      memorySize: 128,
      events: [
        {
          http: {
            method: 'get',
            path: '/transactions',
          }
        }
      ]
    },
    addTransaction: {
      handler: 'src/server.handler',
      memorySize: 128,
      events: [
        {
          http: {
            method: 'post',
            path: '/transactions',
          }
        }
      ]
    },
    getTransactionByUser: {
      handler: 'src/server.handler',
      memorySize: 128,
      events: [
        {
          http: {
            method: 'get',
            path: '/transactions/{id}',
          }
        }
      ]
    }
  },
  resources: {
    Resources: {
      UsersDynamoDBTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          KeySchema: [
            { AttributeName: "pk", KeyType: "HASH" },
            { AttributeName: "sk", KeyType: "RANGE" },
          ],
          AttributeDefinitions: [
            { AttributeName: "pk", AttributeType: "S" },
            { AttributeName: "sk", AttributeType: "S" },
            { AttributeName: "data", AttributeType: "S" },
          ],
          GlobalSecondaryIndexes: [
            {
              IndexName: 'gsi_1',
              KeySchema: [
                { AttributeName: 'sk', KeyType: 'HASH' },
                { AttributeName: 'data', KeyType: 'RANGE' },
              ],
              Projection: {
                ProjectionType: 'ALL',
              },
            },
          ],
          BillingMode: 'PAY_PER_REQUEST',
          ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
          },
          TableName: "${self:custom.tableName}"
        }
      }
    }
  }
}

module.exports = serverlessConfiguration;
