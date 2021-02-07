export default function getPetSchema() {
  return {
    type: "object",
    properties: {
      id: { type: "number" },
      name: { type: "string" },
      description: { type: "string" },
      special: { type: "boolean" },
      age: { type: "number" },
      breed: {
        type: "object",
        properties: {
          id: { type: "number" },
          name: { type: "string" },
        },
      },
      sex: {
        type: "object",
        properties: {
          id: { type: "number" },
          name: { type: "string" },
        },
      },
      color: {
        type: "object",
        properties: {
          id: { type: "number" },
          name: { type: "string" },
        },
      },
      createdAt: { type: "string" },
      updatedAt: { type: "string" },
    },
    required: [
      "id",
      "name",
      "description",
      "special",
      "age",
      "breed",
      "color",
      "sex",
      "createdAt",
      "updatedAt",
    ],
  };
}
