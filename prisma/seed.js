const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const seed = require("./seed.json");

function main() {
  const breeds = seed.breeds.map(async ({ name }, index) => {
    return prisma.breed.upsert({
      where: { id_breed: index + 1 },
      create: { name },
      update: { name },
    });
  });

  const colors = seed.colors.map(async ({ name }, index) => {
    return prisma.color.upsert({
      where: { id_color: index + 1 },
      create: { name },
      update: { name },
    });
  });

  const sexes = seed.sexes.map(async ({ name }, index) => {
    return prisma.sex.upsert({
      where: { id_sex: index + 1 },
      create: { name },
      update: { name },
    });
  });

  return Promise.all([
    Promise.all(breeds),
    Promise.all(colors),
    Promise.all(sexes),
  ]);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => prisma.$disconnect());
