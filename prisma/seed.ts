import { Prisma, PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

async function main() {

  const salt = await bcrypt.genSalt();
  const password1 = await bcrypt.hash("altair123", salt);

  const userData: Prisma.UserCreateInput[] = [
    {
      name: "Muhammad Luqmanul Hakim",
      username: "iamhkmid",
      password: password1,
      role: "ADMIN",
    },
  ]

  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })