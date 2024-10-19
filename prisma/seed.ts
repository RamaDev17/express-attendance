import { PrismaClient } from "@prisma/client";
import { UserSeeder } from "./seeders/user_seeder";
const prisma = new PrismaClient();

const main = async () => {
  console.log("run seed");

  await UserSeeder({ prisma });

  console.log("end seed");
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
