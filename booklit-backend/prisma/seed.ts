import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Clear old data in dependency-safe order
  await prisma.booking.deleteMany();
  await prisma.slot.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.promo.deleteMany();

  // Experiences
  const experiences = await prisma.experience.createMany({
    data: [
      {
        title: "Sunset Kayaking in Bali",
        location: "Bali, Indonesia",
        description: "Paddle through calm waters while the sky turns orange and pink.",
        price: 120,
        image:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
      },
      {
        title: "Hot Air Balloon Ride in Cappadocia",
        location: "Cappadocia, Turkey",
        description: "Soar above the fairy chimneys during sunrise.",
        price: 250,
        image:
          "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=1200&q=80",
      },
      {
        title: "Scuba Diving Adventure",
        location: "Great Barrier Reef, Australia",
        description: "Explore the underwater world and vibrant coral reefs.",
        price: 350,
        image:
          "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1200&q=80",
      },
      {
        title: "Skiing in the Alps",
        location: "Zermatt, Switzerland",
        description: "Hit the slopes in one of the world’s best ski resorts.",
        price: 400,
        image:
          "https://images.unsplash.com/photo-1610899216365-3d263f4e3a74?auto=format&fit=crop&w=1200&q=80",
      },
      {
        title: "Desert Safari",
        location: "Dubai, UAE",
        description: "Ride across the dunes and enjoy a Bedouin-style evening.",
        price: 180,
        image:
          "https://images.unsplash.com/photo-1601309323907-18b6fe4cde51?auto=format&fit=crop&w=1200&q=80",
      },
      {
        title: "Northern Lights Tour",
        location: "Reykjavik, Iceland",
        description: "Witness the magic of Aurora Borealis with an expert guide.",
        price: 500,
        image:
          "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
      },
      {
        title: "Wine Tasting in Tuscany",
        location: "Florence, Italy",
        description: "Savor the taste of world-class wines in scenic vineyards.",
        price: 150,
        image:
          "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=1200&q=80",
      },
      {
        title: "Paragliding in Interlaken",
        location: "Interlaken, Switzerland",
        description: "Fly high above the Swiss Alps with stunning views.",
        price: 270,
        image:
          "https://images.unsplash.com/photo-1509817316-7e58d09794c1?auto=format&fit=crop&w=1200&q=80",
      },
      {
        title: "Trekking in the Himalayas",
        location: "Nepal",
        description: "Embark on a breathtaking trek to Annapurna Base Camp.",
        price: 320,
        image:
          "https://images.unsplash.com/photo-1529516544816-1a4a1b7f1b3e?auto=format&fit=crop&w=1200&q=80",
      },
      {
        title: "Cultural Walk in Kyoto",
        location: "Kyoto, Japan",
        description: "Discover temples, gardens, and geisha traditions.",
        price: 200,
        image:
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  });

  // Fetch all experience IDs
  const allExperiences = await prisma.experience.findMany();

  // Slots (2 per experience)
  for (const exp of allExperiences) {
    await prisma.slot.createMany({
      data: [
        {
          date: new Date("2025-11-05"),
          time: "09:00 AM",
          capacity: 10,
          experienceId: exp.id,
        },
        {
          date: new Date("2025-11-06"),
          time: "04:00 PM",
          capacity: 8,
          experienceId: exp.id,
        },
      ],
    });
  }

  // Promo Codes
  await prisma.promo.createMany({
    data: [
      { code: "SAVE10", discountType: "PERCENT", value: 10, expiry: new Date("2026-01-01") },
      { code: "FLAT100", discountType: "FLAT", value: 100, expiry: new Date("2026-01-01") },
    ],
  });

  console.log("✅ Database seeded successfully!");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
