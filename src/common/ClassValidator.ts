/* eslint-disable @typescript-eslint/ban-types */
import { validate, ValidatorOptions } from "class-validator";

import { Optional } from "./Optional";

export type ClassValidationDetails = {
  context: string;
  errors: ClassValidationErrors[];
};

export type ClassValidationErrors = {
  property: string;
  message: string[];
};

export const ClassValidator = {
  async validate<T extends object>(
    target: T,
    options?: ValidatorOptions,
  ): Promise<Optional<ClassValidationDetails>> {
    let details: Optional<ClassValidationDetails>;
    const errors = await validate(target, options);

    if (errors.length > 0) {
      details = {
        context: target.constructor.name,
        errors: [],
      };

      for (const error of errors) {
        details.errors.push({
          property: error.property,
          message: error.constraints ? Object.values(error.constraints) : [],
        });
      }
    }

    return details;
  },
};
