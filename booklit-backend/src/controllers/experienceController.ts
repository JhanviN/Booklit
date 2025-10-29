import { Request, Response } from "express";
import { prisma } from "../prisma/client";

export const getAllExperiences = async (req: Request, res: Response) => {
  try {
    // Read query from URL (e.g. /experiences?query=bali)
    const query = (req.query.query as string) || "";

    const experiences = await prisma.experience.findMany({
      where: query
        ? {
            OR: [
              { title: { contains: query, mode: "insensitive" } },
              { location: { contains: query, mode: "insensitive" } },
            ],
          }
        : undefined, // If no search query, return all
      orderBy: { id: "asc" },
    });

    res.json(experiences);
  } catch (error) {
    console.error("Error fetching experiences:", error);
    res.status(500).json({ error: "Failed to fetch experiences" });
  }
};

export const getExperienceById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const experience = await prisma.experience.findUnique({
      where: { id },
      include: { slots: true },
    });

    if (!experience) {
      return res.status(404).json({ error: "Experience not found" });
    }

    res.json(experience);
  } catch (error) {
    console.error("Error fetching experience by ID:", error);
    res.status(500).json({ error: "Failed to fetch experience details" });
  }
};
