import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  await prisma.booking.deleteMany();
  await prisma.slot.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.promo.deleteMany();

  await prisma.experience.createMany({
    data: [
      {
        title: "Sunset Kayaking in Bali",
        location: "Bali, Indonesia",
        description: "Paddle through calm waters while the sky turns orange and pink.",
        price: 120,
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      },
      {
        title: "Hot Air Balloon Ride in Cappadocia",
        location: "Cappadocia, Turkey",
        description: "Soar above the fairy chimneys during sunrise.",
        price: 250,
        image: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e",
      },
      {
        title: "Scuba Diving Adventure",
        location: "Great Barrier Reef, Australia",
        description: "Explore the underwater world and vibrant coral reefs.",
        price: 350,
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=60",
      },
      {
        title: "Skiing in the Alps",
        location: "Zermatt, Switzerland",
        description: "Hit the slopes in one of the world’s best ski resorts.",
        price: 400,
        image: "https://images.unsplash.com/photo-1600783241938-953d843b0d3d",
      },
      {
        title: "Desert Safari",
        location: "Dubai, UAE",
        description: "Ride across the dunes and enjoy a Bedouin-style evening.",
        price: 180,
        image: "https://images.unsplash.com/photo-1601309323907-18b6fe4cde51",
      },
      {
        title: "Northern Lights Tour",
        location: "Reykjavik, Iceland",
        description: "Witness the magic of Aurora Borealis with an expert guide.",
        price: 500,
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
      },
      {
        title: "Wine Tasting in Tuscany",
        location: "Florence, Italy",
        description: "Savor the taste of world-class wines in scenic vineyards.",
        price: 150,
        image: "https://images.unsplash.com/photo-1510626176961-4b37d6a860da",
      },
      {
        title: "Paragliding in Interlaken",
        location: "Interlaken, Switzerland",
        description: "Fly high above the Swiss Alps with stunning views.",
        price: 270,
        image: "https://images.unsplash.com/photo-1516569422645-ef9ad0a67cf3",
      },
      {
        title: "Trekking in the Himalayas",
        location: "Nepal",
        description: "Embark on a breathtaking trek to Annapurna Base Camp.",
        price: 320,
        image: "https://images.unsplash.com/photo-1526318472351-bc6f3e8135c9",
      },
      {
        title: "Cultural Walk in Kyoto",
        location: "Kyoto, Japan",
        description: "Discover temples, gardens, and geisha traditions.",
        price: 200,
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      },
    ],
  });

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
