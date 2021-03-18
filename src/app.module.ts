import { Module, ValidationPipe } from "@nestjs/common";
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core";
import { PlacementsModule } from "modules/placements/placements.module";

import { HttpExceptionFilter } from "./filters/http-exception.filter";
import { HttpLoggingInterceptor } from "./interceptors/http-logging.interceptor";
import { PetsModule } from "./modules/pets/pets.module";

@Module({
  imports: [PetsModule, PlacementsModule],
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
      provide: APP_PIPE,
      useValue: new ValidationPipe({ transform: true }),
    },
  ],
})
export class AppModule {}
