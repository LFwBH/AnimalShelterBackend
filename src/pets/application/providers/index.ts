import { Provider } from "@nestjs/common";

import { PETS_SERVICE } from "../../domain/providers";
import { PetsService } from "../services/pets.service";

const providers: Provider[] = [
  {
    provide: PETS_SERVICE,
    useClass: PetsService,
  },
];

export { providers };
