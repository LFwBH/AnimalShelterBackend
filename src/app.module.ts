import { Module, ValidationPipe } from "@nestjs/common";
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core";
import { PlacementsModule } from "modules/placements/placements.module";
import { LoggerModule } from "nestjs-pino";

import { HttpExceptionFilter } from "./filters/http-exception.filter";
import { HttpLoggingInterceptor } from "./interceptors/http-logging.interceptor";
import { IncomeModule } from "./modules/income/income.module";
import { LocationsModule } from "./modules/locations/locations.module";
import { PetsModule } from "./modules/pets/pets.module";
import { UsersModule } from "./modules/users/users.module";
import { LOGGER_SERVICE } from "./providers";
import { PinoLoggerService } from "./services/pino-logger.service";

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.NODE_ENV !== "production" ? "debug" : "info",
        prettyPrint: process.env.NODE_ENV !== "production",
      },
    }),
    PetsModule,
    PlacementsModule,
    LocationsModule,
    UsersModule,
    IncomeModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpLoggingInterceptor,
    },
    {
      provide: LOGGER_SERVICE,
      useClass: PinoLoggerService,
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ transform: true }),
    },
  ],
})
export class AppModule {}
