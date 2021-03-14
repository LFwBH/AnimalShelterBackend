export default function getPetSchema() {
  return {
    type: "object",
    properties: {
      id: { type: "number" },
      name: { type: "string" },
      description: { type: "string" },
      special: { type: "boolean" },
      age: { type: "number" },
      kind: { type: "string" },
      sex: { type: "string" },
      color: { type: "string" },
      createdAt: { type: "string" },
      updatedAt: { type: "string" },
    },
    required: [
      "id",
      "name",
      "description",
      "special",
      "age",
      "kind",
      "color",
      "sex",
      "createdAt",
      "updatedAt",
    ],
  };
}
