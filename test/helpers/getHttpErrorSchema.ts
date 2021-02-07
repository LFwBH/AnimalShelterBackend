interface ErrorSchemaOptions<
  TMin extends number = number,
  TMax extends number = number
> {
  minItems: TMin;
  maxItems: TMax;
}

export default function getHttpErrorSchema<
  TMin extends number = number,
  TMax extends number = number
>(options: ErrorSchemaOptions<TMin, TMax>) {
  return {
    type: "object",
    properties: {
      context: { type: "string" },
      errors: {
        type: "array",
        contains: {
          type: "object",
          properties: {
            property: { type: "string" },
            message: { type: "array", contains: { type: "string" } },
          },
          required: ["property", "message"],
        },
        minItems: options.minItems,
        maxItems: options.maxItems,
      },
    },
    required: ["context", "errors"],
  };
}
