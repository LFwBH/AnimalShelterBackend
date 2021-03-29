import { Provider } from "@nestjs/common";

import { TransactionalUseCaseWrapper } from "../../../../common/TransactionalUseCaseWrapper";
import { PrismaService } from "../../../../services/prisma.service";
import {
  CREATE_LOCATION_USE_CASE,
  FIND_ALL_LOCATIONS_USE_CASE,
  FIND_LOCATION_BY_ID_USE_CASE,
  UPDATE_LOCATION_USE_CASE,
} from "../../domain/providers";
import { LocationRepository } from "../../domain/repositories/location.repository";
import { CreateLocationService } from "../services/create-location.service";
import { FindAllLocationsService } from "../services/find-all-locations.service";
import { FindLocationByIdService } from "../services/find-location-by-id.service";
import { UpdateLocationService } from "../services/update-location.service";

const providers: Provider[] = [
  {
    provide: CREATE_LOCATION_USE_CASE,
    useFactory: (
      locationRepository: LocationRepository,
      prismaService: PrismaService,
    ) => {
      const createLocationService = new CreateLocationService(
        locationRepository,
      );
      return new TransactionalUseCaseWrapper(
        createLocationService,
        prismaService,
      );
    },
  },
  {
    provide: UPDATE_LOCATION_USE_CASE,
    useFactory: (
      locationRepository: LocationRepository,
      prismaService: PrismaService,
    ) => {
      const updateLocationService = new UpdateLocationService(
        locationRepository,
      );
      return new TransactionalUseCaseWrapper(
        updateLocationService,
        prismaService,
      );
    },
  },
  {
    provide: FIND_LOCATION_BY_ID_USE_CASE,
    useClass: FindLocationByIdService,
  },
  {
    provide: FIND_ALL_LOCATIONS_USE_CASE,
    useClass: FindAllLocationsService,
  },
];

export { providers };
