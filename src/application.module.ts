import { Module } from "@nestjs/common";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { GraphQLError, GraphQLFormattedError } from "graphql";
import { v4 as uuidV4 } from "uuid";

import { LoggerModule } from "./modules/logger/logger.module";
import { LoggerService } from "./modules/logger/services/logger.service";

import { MailerModule } from "./modules/mailer/mailer.module";
import { AuthModule } from "./modules/auth/auth.module";
import { ActivityModule } from "./modules/activity/activity.module";
import { CompanyModule } from "./modules/company/company.module";

import { ApplicationController } from "./application.controller";

@Module({
  imports: [
    EventEmitterModule.forRoot({
      wildcard: true,
      delimiter: ".",
      verboseMemoryLeak: true,
      ignoreErrors: false,
    }),
    GraphQLModule.forRootAsync({
      imports: [LoggerModule],
      inject: [LoggerService],
      useFactory: (logger: LoggerService) => {
        logger.setContext(GraphQLModule.name);

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
    MailerModule,
    AuthModule,
    ActivityModule,
    CompanyModule,
  ],
  controllers: [ApplicationController],
})
export class ApplicationModule {}
