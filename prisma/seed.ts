import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const password = await bcrypt.hash('admin123', 10)
  await prisma.user.upsert({
    where: { email: 'admin@infobet.com' },
    update: {},
    create: {
      email: 'admin@infobet.com',
      password,
      name: 'Admin',
      role: 'ADMIN'
    }
  })
  console.log('✅ Usuario admin creado')
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect())
