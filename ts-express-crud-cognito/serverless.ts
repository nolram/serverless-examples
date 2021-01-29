import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'my-express-application-cognito',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    },
    tableName: 'users-table-cognito-${self:provider.stage}',
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
    httpApi: {
      authorizers: {
        serviceAuthorizer: {
          identitySource: '$request.header.Authorization',
          issuerUrl: {
            "Fn::Join": [
              "",
              [
                "https://cognito-idp.",
                "${opt:region, self:provider.region}",
                ".amazonaws.com/",
                {
                  Ref: "serviceUserPool"
                }
              ]
            ]
          },
          audience: [
            {
              Ref: "serviceUserPoolClient"
            }
          ]
        }
      }
    },
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      USERS_TABLE: '${self:custom.tableName}',
      DOMAIN_SUFFIX: 'galfie'
    }
  },
  functions: {
    app: {
      handler: 'src/server.handler',
      memorySize: 128,
      events: [
        {
          httpApi: {
            method: 'get',
            path: '/hello',
            authorizer: {
              name: 'serviceAuthorizer'
            }
          }
        }
      ]
    },
    getUser: {
      handler: 'src/server.handler',
      memorySize: 128,
      events: [
        {
          httpApi: {
            method: 'get',
            path: '/users/{id}',
            authorizer: {
              name: 'serviceAuthorizer'
            }
          }
        }
      ]
    },
    getUsers: {
      handler: 'src/server.handler',
      memorySize: 128,
      events: [
        {
          httpApi: {
            method: 'get',
            path: '/users',
            authorizer: {
              name: 'serviceAuthorizer'
            }
          }
        }
      ]
    },
    createUser: {
      handler: 'src/server.handler',
      memorySize: 128,
      events: [
        {
          httpApi: {
            method: 'post',
            path: '/users',
            authorizer: {
              name: 'serviceAuthorizer'
            }
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
      },
      // HttpApi: {
      //   DependsOn: ["serviceUserPool",]
      // },
      serviceUserPool: {
        Type: "AWS::Cognito::UserPool",
        Properties: {
          UserPoolName: "service-user-pool-${opt:stage, self:provider.stage}",
          UsernameAttributes: [
            "email"
          ],
          AutoVerifiedAttributes: [
            "email"
          ]
        }
      },
      serviceUserPoolClient: {
        Type: "AWS::Cognito::UserPoolClient",
        Properties: {
          ClientName: "service-user-pool-client-${opt:stage, self:provider.stage}",
          AllowedOAuthFlows: [
            "implicit"
          ],
          AllowedOAuthFlowsUserPoolClient: true,
          AllowedOAuthScopes: [
            "phone",
            "email",
            "openid",
            "profile",
            "aws.cognito.signin.user.admin"
          ],
          UserPoolId: {
            Ref: "serviceUserPool"
          },
          CallbackURLs: [
            "https://localhost:3000"
          ],
          ExplicitAuthFlows: [
            "ALLOW_USER_SRP_AUTH",
            "ALLOW_REFRESH_TOKEN_AUTH"
          ],
          GenerateSecret: false,
          SupportedIdentityProviders: [
            "COGNITO"
          ]
        }
      },
      serviceUserPoolDomain: {
        Type: "AWS::Cognito::UserPoolDomain",
        Properties: {
          UserPoolId: {
            Ref: "serviceUserPool"
          },
          Domain: "service-user-pool-domain-${opt:stage, self:provider.stage}-${self:provider.environment.DOMAIN_SUFFIX}"
        }
      }
    }
  }
}

module.exports = serverlessConfiguration;
