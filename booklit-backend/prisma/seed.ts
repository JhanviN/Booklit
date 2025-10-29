import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.experience.createMany({
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

  await prisma.slot.createMany({
    data: [
      {
        date: new Date("2025-11-05"),
        time: "08:00 AM",
        capacity: 10,
        experienceId: 1,
      },
      {
        date: new Date("2025-11-06"),
        time: "04:00 PM",
        capacity: 8,
        experienceId: 1,
      },
      {
        date: new Date("2025-11-05"),
        time: "06:00 AM",
        capacity: 12,
        experienceId: 2,
      },
    ],
  });

  await prisma.promo.createMany({
    data: [
      { code: "SAVE10", discountType: "PERCENT", value: 10, expiry: new Date("2026-01-01") },
      { code: "FLAT100", discountType: "FLAT", value: 100, expiry: new Date("2026-01-01") },
    ],
  });
}

main().finally(() => prisma.$disconnect());
