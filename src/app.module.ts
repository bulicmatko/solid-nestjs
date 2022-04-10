import { Module } from "@nestjs/common";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { GraphQLError, GraphQLFormattedError } from "graphql";
import { v4 as uuidV4 } from "uuid";

import { LoggerModule } from "./modules/logger/logger.module";
import { LoggerService } from "./modules/logger/services/logger.service";

import { MailerModule } from "./modules/mailer/mailer.module";
import { AuthModule } from "./modules/auth/auth.module";
import { ActivityModule } from "./modules/activity/activity.module";
import { CompanyModule } from "./modules/company/company.module";

import { AppController } from "./app.controller";

@Module({
  imports: [
    EventEmitterModule.forRoot({
      wildcard: true,
      delimiter: ".",
      verboseMemoryLeak: true,
      ignoreErrors: false,
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      imports: [LoggerModule],
      inject: [LoggerService],
      driver: ApolloDriver,
      useFactory: (logger: LoggerService) => {
        logger.setContext(GraphQLModule.name);

        return {
          playground: false,
          autoSchemaFile: true,
          installSubscriptionHandlers: true,
          fieldResolverEnhancers: ["guards", "interceptors", "filters"],
          plugins: [ApolloServerPluginLandingPageLocalDefault()],
          subscriptions: {
            "graphql-ws": {
              context() {
                return {
                  user: {
                    id: "456cfde8-03df-47ed-92e6-19e2c75d78de",
                    isAdmin: true,
                    subUserIds: [
                      "61d20e69-d801-4cab-995e-86d629e7718a",
                      "bb102dee-adcc-420a-98ed-539d73fb1ac6",
                    ],
                    permissions: [
                      "Activity:read",
                      "Company:create",
                      "Company:read",
                      "Company:update",
                      "Company:delete",
                    ],
                  },
                };
              },
              onConnect(): void {
                return;
              },
            },
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
  controllers: [AppController],
})
export class AppModule {}
