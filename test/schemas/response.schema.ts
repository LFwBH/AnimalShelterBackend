import { Factory } from "rosie";

export const ResponseSchemaFactory = Factory.define("responseSchema")
  .option("data")
  .attr("type", "object")
  .attr("properties", ["data"], (data) => ({
    code: { type: "number" },
    message: { type: "string" },
    data: data,
    timestamp: { type: "number" },
  }))
  .attr("required", ["code", "message", "data", "timestamp"]);
