import { Module } from "@nestjs/common";
import { GraphQLModule as NestGraphQlModule } from "@nestjs/graphql";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { GraphQLError, GraphQLFormattedError } from "graphql";
import { v4 as uuidV4 } from "uuid";

import { LoggerModule } from "../logger/logger.module";
import { LoggerService } from "../logger/services/logger.service";

@Module({
  imports: [
    NestGraphQlModule.forRootAsync({
      imports: [LoggerModule],
      inject: [LoggerService],
      useFactory: (logger: LoggerService) => {
        logger.setContext(NestGraphQlModule.name);

        return {
          playground: false,
          autoSchemaFile: true,
          installSubscriptionHandlers: true,
          fieldResolverEnhancers: ["guards", "interceptors", "filters"],
          plugins: [ApolloServerPluginLandingPageLocalDefault()],
          subscriptions: {
            "graphql-ws": true,
            // 'graphql-ws': {
            //   onConnect: ({ connectionParams, extra }) => {
            //     console.log(connectionParams);
            //     extra.user = { user: undefined };
            //   },
            // },
            "subscriptions-transport-ws": true,
            // 'subscriptions-transport-ws': {
            //   onDisconnect: console.log,
            //   onConnect: (connectionParams) => {
            //     console.log(connectionParams);
            //     // Get and validate access token
            //     // Get user from access token
            //     return { user: undefined };
            //   },
            // },
          },
          formatError: (error: GraphQLError): GraphQLFormattedError => {
            switch (error.extensions.code) {
              case "UNAUTHENTICATED":
              case "FORBIDDEN":
              case "404": // NOT_FOUND
              case "BAD_USER_INPUT": {
                return error;
              }

              case "INTERNAL_SERVER_ERROR":
              default: {
                const errorId = uuidV4();
                logger.error(errorId, { error });

                return new GraphQLError(
                  "INTERNAL_SERVER_ERROR",
                  undefined,
                  undefined,
                  undefined,
                  undefined,
                  undefined,
                  { errorId },
                );
              }
            }
          },
        };
      },
    }),
  ],
})
export class GraphQlModule {}
