import { Factory } from "rosie";

export const HttpErrorSchemaFactory = Factory.define("httpErrorSchema")
  .attr("type", "object")
  .option("minItems")
  .option("maxItems")
  .attr("properties", ["minItems", "maxItems"], (minItems, maxItems) => ({
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
      minItems: minItems,
      maxItems: maxItems,
    },
  }))
  .attr("required", ["context", "errors"]);
