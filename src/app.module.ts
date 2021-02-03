import { Module } from "@nestjs/common";

import { PetsModule } from "./pets/pets.module";
import { PrismaService } from "./services/prisma.service";

@Module({
  imports: [PetsModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
