export default function getResponseSchema<T extends object>(data: T) {
  return {
    properties: {
      code: { type: "number" },
      message: { type: "string" },
      data: data,
      timestamp: { type: "number" },
    },
    required: ["code", "message", "data", "timestamp"],
  };
}
