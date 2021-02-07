import { Module } from "@nestjs/common";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";

import { HttpExceptionFilter } from "./filters/http-exception.filter";
import { HttpLoggingInterceptor } from "./interceptors/http-logging.interceptor";
import { PetsModule } from "./pets/pets.module";

@Module({
  imports: [PetsModule],
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
  ],
})
export class AppModule {}
