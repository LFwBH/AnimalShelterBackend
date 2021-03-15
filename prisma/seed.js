const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // noop
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => prisma.$disconnect());
