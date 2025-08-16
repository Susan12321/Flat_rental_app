import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Seeding database...")

  // Create admin user
  const adminPassword = await bcrypt.hash("admin123", 12)
  const admin = await prisma.user.upsert({
    where: { email: "admin@flatrental.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@flatrental.com",
      passwordHash: adminPassword,
      role: "ADMIN",
    },
  })

  // Create sample landlord
  const landlordPassword = await bcrypt.hash("landlord123", 12)
  const landlord = await prisma.user.upsert({
    where: { email: "landlord@example.com" },
    update: {},
    create: {
      name: "John Landlord",
      email: "landlord@example.com",
      passwordHash: landlordPassword,
      role: "LANDLORD",
    },
  })

  // Create sample tenant
  const tenantPassword = await bcrypt.hash("tenant123", 12)
  const tenant = await prisma.user.upsert({
    where: { email: "tenant@example.com" },
    update: {},
    create: {
      name: "Jane Tenant",
      email: "tenant@example.com",
      passwordHash: tenantPassword,
      role: "TENANT",
    },
  })

  // Create sample property
  const property = await prisma.property.create({
    data: {
      landlordId: landlord.id,
      title: "Modern 2BR Apartment in City Center",
      description: "Beautiful modern apartment with great city views, fully furnished with all amenities.",
      address: "123 Main Street, Apt 4B",
      city: "New York",
      postalCode: "10001",
      rent: 2500.0,
      availableFrom: new Date("2024-02-01"),
    },
  })

  // Add sample property images
  await prisma.propertyImage.createMany({
    data: [
      {
        propertyId: property.id,
        imageUrl: "/modern-apartment-living-room.png",
      },
      {
        propertyId: property.id,
        imageUrl: "/modern-apartment-bedroom.png",
      },
      {
        propertyId: property.id,
        imageUrl: "/modern-apartment-kitchen.png",
      },
    ],
  })

  console.log("✅ Database seeded successfully!")
  console.log("👤 Admin: admin@flatrental.com / admin123")
  console.log("🏠 Landlord: landlord@example.com / landlord123")
  console.log("🏠 Tenant: tenant@example.com / tenant123")
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
