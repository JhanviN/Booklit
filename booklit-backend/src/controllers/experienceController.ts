import { Request, Response } from "express";
import { prisma } from "../prisma/client";

export const getAllExperiences = async (req: Request, res: Response) => {
  try {
    const experiences = await prisma.experience.findMany();
    res.json(experiences);
  } catch (error) {
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
    if (!experience) return res.status(404).json({ error: "Not found" });
    res.json(experience);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch experience details" });
  }
};
