import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // 🔹 Delete in correct order (respect foreign keys)
  await prisma.booking.deleteMany();
  await prisma.slot.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.promo.deleteMany();

  // 🔹 Create experiences
  const experiences = await prisma.experience.createMany({
    data: [
      {
        title: "Sunset Kayaking in Bali",
        location: "Bali, Indonesia",
        description: "Enjoy a peaceful kayaking session as the sun sets.",
        price: 120,
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      },
      {
        title: "Hot Air Balloon Ride in Cappadocia",
        location: "Cappadocia, Turkey",
        description: "Soar above the fairy chimneys at sunrise.",
        price: 250,
        image: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e",
      },
    ],
  });

  // 🔹 Fetch created experiences (for dynamic IDs)
  const allExperiences = await prisma.experience.findMany();

  // 🔹 Create slots linked to those experiences
  await prisma.slot.createMany({
    data: [
      {
        date: new Date("2025-11-05"),
        time: "08:00 AM",
        capacity: 10,
        experienceId: allExperiences[0].id,
      },
      {
        date: new Date("2025-11-06"),
        time: "04:00 PM",
        capacity: 8,
        experienceId: allExperiences[0].id,
      },
      {
        date: new Date("2025-11-05"),
        time: "06:00 AM",
        capacity: 12,
        experienceId: allExperiences[1].id,
      },
    ],
  });

  // 🔹 Create promo codes
  await prisma.promo.createMany({
    data: [
      { code: "SAVE10", discountType: "PERCENT", value: 10, expiry: new Date("2026-01-01") },
      { code: "FLAT100", discountType: "FLAT", value: 100, expiry: new Date("2026-01-01") },
    ],
    skipDuplicates: true, // ✅ prevents unique constraint error
  });

  console.log("✅ Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
