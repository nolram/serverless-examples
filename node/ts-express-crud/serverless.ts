import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'my-express-application',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    },
    tableName: 'users-table-${self:provider.stage}',
    dynamodb: {
      stages: ['dev'],
      start: {
        migrate: true
      }
    }
  },
  // Add the serverless-webpack plugin
  plugins: ['serverless-webpack', 'serverless-dynamodb-local', 'serverless-offline'],
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
      USERS_TABLE: '${self:custom.tableName}'
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
    getUser: {
      handler: 'src/server.handler',
      memorySize: 128,
      events: [
        {
          http: {
            method: 'get',
            path: '/users/{id}',
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
    }
  },
  resources: {
    Resources: {
      UsersDynamoDBTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          AttributeDefinitions: [
            {
              AttributeName: "userId",
              AttributeType: "S"
            }
          ],
          KeySchema: [
            {
              AttributeName: "userId",
              KeyType: "HASH"
            }
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
          },
          TableName: "${self:custom.tableName}"
        }
      }
    }
  }
}

module.exports = serverlessConfiguration;
