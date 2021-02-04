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
  plugins: ['serverless-webpack', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    profile: 'test-serverless',
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
    }
  }
}

module.exports = serverlessConfiguration;
