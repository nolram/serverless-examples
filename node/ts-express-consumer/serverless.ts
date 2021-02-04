import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'ts-express-consumer',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    },
    'serverless-offline-aws-eventbridge': {
      port: 4011,
      debug: false,
      account: ''
    }
  },
  // Add the serverless-webpack plugin
  plugins: ['serverless-webpack', 'serverless-offline', 'serverless-offline-aws-eventbridge'],
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
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1'
    }
  },
  functions: {
    emailConsumer: {
      handler: 'src/server.consumer',
      memorySize: 128,
      events: [
        {
          eventBridge: {
            eventBus: 'default',
            pattern: {
              source: [
                'nolram.alert.primeaccount'
              ]
            },
          }
        }
      ]
    }
  }
}

module.exports = serverlessConfiguration;
