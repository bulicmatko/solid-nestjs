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

import { CompanyCreateOneModule } from "./modules/company-create-one/company-create-one.module";
import { CompanyFindManyModule } from "./modules/company-find-many/company-find-many.module";

import { AppController } from "./app.controller";
import { AccountCreateModule } from "./use-cases/account-create";

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
                // TODO: Get current user
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

    CompanyCreateOneModule,
    CompanyFindManyModule,

    AccountCreateModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
